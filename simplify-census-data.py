#!/usr/bin/env python3
"""
Transform complex census JSON data into simplified format.

This script converts the complex nested structure from 3_1_3Q9M-CSVR-T893.json
into a simplified format matching the structure used in the index-creation test.
"""

import json

# Relationship type mappings
RELATIONSHIP_ROLES = {
    'PARENT_CHILD': {
        'FIRST': 'PARENT',
        'SECOND': 'CHILD'
    },
    'GRAND_PARENT': {
        'FIRST': 'GRANDPARENT',
        'SECOND': 'GRANDCHILD'
    },
    'PARENT_CHILD_IN_LAW': {
        'FIRST': 'PARENT_IN_LAW',
        'SECOND': 'CHILD_IN_LAW'
    },
    'COUPLE': {
        'FIRST': 'SPOUSE',
        'SECOND': 'SPOUSE'
    },
    'SIBLING': {
        'FIRST': 'SIBLING',
        'SECOND': 'SIBLING'
    },
    'SIBLING_IN_LAW': {
        'FIRST': 'SIBLING_IN_LAW',
        'SECOND': 'SIBLING_IN_LAW'
    },
    'AUNT_OR_UNCLE': {
        'FIRST': 'AUNT_OR_UNCLE',
        'SECOND': 'NIECE_OR_NEPHEW'
    }
}

def load_complex_json(filepath):
    """Load the complex JSON file"""
    print(f"Loading {filepath}...")
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        return json.load(f)

def build_element_map(elements):
    """Create lookup map: id -> element"""
    return {elem['id']: elem for elem in elements}

def get_all_descendant_fields(elem_id, element_map, depth=0, max_depth=10):
    """Recursively get all FIELD elements under this element"""
    if depth > max_depth:
        return []

    elem = element_map.get(elem_id)
    if not elem:
        return []

    fields = []

    # If this is a FIELD, add it
    if elem.get('elementType') == 'FIELD':
        fields.append(elem)

    # Recursively check subElements
    for sub in elem.get('subElements', []):
        fields.extend(get_all_descendant_fields(sub['id'], element_map, depth + 1, max_depth))

    return fields

def get_all_descendant_elements(elem_id, element_map, depth=0, max_depth=10):
    """Recursively get all elements under this element"""
    if depth > max_depth:
        return []

    elem = element_map.get(elem_id)
    if not elem:
        return []

    elements = [elem]

    # Recursively check subElements
    for sub in elem.get('subElements', []):
        elements.extend(get_all_descendant_elements(sub['id'], element_map, depth + 1, max_depth))

    return elements

def build_person(person_elem, element_map):
    """Build simplified person object from PERSON element"""
    person_id = person_elem['id']

    # Get all descendant elements (not just FIELDs)
    all_descendants = get_all_descendant_elements(person_id, element_map)

    # Extract fields from FIELD elements
    given_name = None
    surname = None
    relationship = None
    occupation = None
    sex = ""
    age = ""
    race = ""

    # Extract from FIELD elements
    for elem in all_descendants:
        if elem.get('elementType') == 'FIELD':
            ft = elem.get('fieldType')

            # Extract text from nested fieldValues structure
            text = ''
            field_values = elem.get('fieldValues', [])
            if field_values and len(field_values) > 0:
                orig_value = field_values[0].get('origValue', {})
                text = orig_value.get('text', '')

            if not text:
                continue

            if ft == 'NAME_GN':
                given_name = text
            elif ft == 'NAME_SURN':
                surname = text
            elif ft == 'OCCUPATION':
                occupation = text
            elif ft == 'SEX' or ft == 'SEX_CODE' or ft == 'GENDER':
                sex = text
            elif ft == 'AGE':
                age = text
            elif ft == 'RACE':
                race = text

    # Extract relationship from RELATIONSHIP elements
    for elem in all_descendants:
        if elem.get('elementType') == 'RELATIONSHIP':
            rel_type = elem.get('relType')
            if rel_type:
                # Map relationship types to readable labels
                rel_map = {
                    'COUPLE': 'Spouse',
                    'PARENT_CHILD': 'Child',
                    'SIBLING': 'Sibling',
                }
                relationship = rel_map.get(rel_type, rel_type)
                break  # Use first relationship found

    person = {
        "id": person_id,
        "givenName": given_name or "",
        "surname": surname or "",
        "relationship": relationship or "",
        "sex": sex,
        "age": age,
        "race": race,
        "relationships": [],
        "attachedPersons": [],
        "hints": []
    }

    # Add occupation if present
    if occupation:
        person["occupation"] = occupation

    return person

def extract_person_relationships(person_id, all_relationships, person_map):
    """
    Extract all relationships for a specific person.

    Args:
        person_id: ID of the person
        all_relationships: List of all RELATIONSHIP elements
        person_map: Dict mapping person ID -> person object (with name)

    Returns:
        List of relationship dicts for this person
    """
    relationships = []

    for rel_elem in all_relationships:
        super_elems = rel_elem.get('superElements', [])
        if len(super_elems) != 2:
            continue

        rel_type = rel_elem.get('relType')
        if not rel_type:
            continue

        # Check if this person is involved in this relationship
        person_index = None
        person_order = None
        other_person_id = None
        other_person_order = None

        for idx, super_elem in enumerate(super_elems):
            if super_elem.get('id') == person_id:
                person_index = idx
                person_order = super_elem.get('order')
                # Get the other person
                other_idx = 1 - idx
                other_person_id = super_elems[other_idx].get('id')
                other_person_order = super_elems[other_idx].get('order')
                break

        if person_index is None:
            continue  # This relationship doesn't involve this person

        # Get role for this person
        role_map = RELATIONSHIP_ROLES.get(rel_type, {})
        role = role_map.get(person_order, rel_type)

        # Get related person info
        related_person = person_map.get(other_person_id)
        if not related_person:
            continue

        related_name = f"{related_person.get('givenName', '')} {related_person.get('surname', '')}".strip()
        if not related_name:
            related_name = "Unknown"

        relationships.append({
            "type": rel_type,
            "role": role,
            "relatedPersonId": other_person_id,
            "relatedPersonName": related_name
        })

    return relationships

def build_relationship_graph(all_relationships, person_map):
    """
    Build top-level relationship graph for the record.

    Args:
        all_relationships: List of all RELATIONSHIP elements
        person_map: Dict mapping person ID -> person object

    Returns:
        List of relationship objects with both persons and roles
    """
    graph = []

    for rel_elem in all_relationships:
        super_elems = rel_elem.get('superElements', [])
        if len(super_elems) != 2:
            continue

        rel_type = rel_elem.get('relType')
        rel_id = rel_elem.get('id')
        if not rel_type:
            continue

        person1_id = super_elems[0].get('id')
        person1_order = super_elems[0].get('order')
        person2_id = super_elems[1].get('id')
        person2_order = super_elems[1].get('order')

        # Get person info
        person1 = person_map.get(person1_id)
        person2 = person_map.get(person2_id)

        if not person1 or not person2:
            continue

        # Get roles
        role_map = RELATIONSHIP_ROLES.get(rel_type, {})
        person1_role = role_map.get(person1_order, rel_type)
        person2_role = role_map.get(person2_order, rel_type)

        # Build names
        person1_name = f"{person1.get('givenName', '')} {person1.get('surname', '')}".strip()
        person2_name = f"{person2.get('givenName', '')} {person2.get('surname', '')}".strip()

        graph.append({
            "id": rel_id,
            "type": rel_type,
            "person1": {
                "id": person1_id,
                "name": person1_name or "Unknown",
                "role": person1_role
            },
            "person2": {
                "id": person2_id,
                "name": person2_name or "Unknown",
                "role": person2_role
            }
        })

    return graph

def build_record(record_elem, element_map):
    """Build simplified record object from RECORD element"""
    record_id = record_elem['id']
    person_ids = [sub['id'] for sub in record_elem.get('subElements', [])]

    # Build people array
    people = []
    for pid in person_ids:
        person_elem = element_map.get(pid)
        if person_elem and person_elem.get('elementType') == 'PERSON':
            people.append(build_person(person_elem, element_map))

    # Create person map for relationship lookups
    person_map = {p['id']: p for p in people}

    # Find all RELATIONSHIP elements for this record
    all_relationships = []
    for pid in person_ids:
        person_elem = element_map.get(pid)
        if person_elem:
            # Get all descendant elements including relationships
            descendants = get_all_descendant_elements(pid, element_map)
            for desc in descendants:
                if desc.get('elementType') == 'RELATIONSHIP':
                    # Avoid duplicates
                    if desc not in all_relationships:
                        all_relationships.append(desc)

    # Extract relationships for each person
    for person in people:
        person['relationships'] = extract_person_relationships(
            person['id'],
            all_relationships,
            person_map
        )

    # Build relationship graph
    relationship_graph = build_relationship_graph(all_relationships, person_map)

    # Extract record-level fields
    date = ""
    place = ""
    event_type = "Census"

    # Scan through all person fields (recursively) to find record-level info
    all_fields = []
    for pid in person_ids:
        all_fields.extend(get_all_descendant_fields(pid, element_map))

    # Extract place and date from fields
    places = []
    dates = []

    for field in all_fields:
        ft = field.get('fieldType')

        # Extract text from nested fieldValues structure
        text = ''
        field_values = field.get('fieldValues', [])
        if field_values and len(field_values) > 0:
            orig_value = field_values[0].get('origValue', {})
            text = orig_value.get('text', '')

        if not text:
            continue

        if ft == 'DATE' and text and text != '--' and text != 'none':
            dates.append(text)
        elif ft == 'PLACE' and text:
            places.append(text)
        elif ft == 'EVENT_TYPE' and text and text != 'Other':
            event_type = text

    # Combine place components
    if places:
        # Remove duplicates while preserving order
        unique_places = []
        seen = set()
        for p in places:
            if p not in seen and p not in ['Ky', '-']:
                seen.add(p)
                unique_places.append(p)
        place = ', '.join(unique_places) if unique_places else ""

    # Use the most complete date
    if dates:
        date = max(dates, key=len) if dates else ""

    return {
        "id": record_id,
        "recordType": event_type,
        "date": date,
        "place": place,
        "people": people,
        "relationshipGraph": relationship_graph
    }

def extract_document_metadata(elements):
    """Extract document-level date and place from all FIELD elements"""
    dates = []
    places = []

    for elem in elements:
        if elem.get('elementType') == 'FIELD':
            ft = elem.get('fieldType')
            fv = elem.get('fieldValues', [])

            if fv and len(fv) > 0:
                text = fv[0].get('origValue', {}).get('text', '')

                if text:
                    if ft == 'DATE' and text not in ['--', 'none', '']:
                        dates.append(text)
                    elif ft == 'PLACE' and text:
                        places.append(text)

    # Get most common or first values
    date = dates[0] if dates else ""

    # Combine place components (remove Ky duplicates, keep Kentucky and counties)
    if places:
        unique_places = []
        seen = set()
        for p in places:
            if p not in seen and p not in ['Ky', '-']:
                seen.add(p)
                if p not in unique_places:
                    unique_places.append(p)
        place = ', '.join(unique_places[:3]) if unique_places else ""  # Max 3 components
    else:
        place = ""

    return date, place

def transform_to_simplified(complex_data):
    """Main transformation function"""
    elements = complex_data.get('elements', [])
    print(f"Processing {len(elements)} elements...")

    element_map = build_element_map(elements)

    # Extract document-level metadata
    doc_date, doc_place = extract_document_metadata(elements)
    print(f"Document date: {doc_date or 'Not found'}")
    print(f"Document place: {doc_place or 'Not found'}")

    # Find all RECORD elements
    records = []
    for elem in elements:
        if elem.get('elementType') == 'RECORD':
            record = build_record(elem, element_map)
            # Use document-level date/place if record doesn't have them
            if not record['date']:
                record['date'] = doc_date
            if not record['place']:
                record['place'] = doc_place
            if record['people']:  # Only include records with people
                records.append(record)

    return {"records": records}

def main():
    input_file = '/Users/haymcarthur/User Tests/ai-auto-index/3_1_3Q9M-CSVR-T893.json'
    output_file = '/Users/haymcarthur/User Tests/ai-auto-index/KentuckyCensus-simple.json'

    try:
        complex_data = load_complex_json(input_file)

        print("Transforming data...")
        simplified_data = transform_to_simplified(complex_data)

        print(f"Found {len(simplified_data['records'])} records with people")

        # Count total people
        total_people = sum(len(record['people']) for record in simplified_data['records'])
        print(f"Total people: {total_people}")

        print(f"Writing to {output_file}...")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(simplified_data, f, indent=2)

        print("✓ Done! Transformation complete.")

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        return 1

    return 0

if __name__ == '__main__':
    exit(main())
