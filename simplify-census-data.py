#!/usr/bin/env python3
"""
Transform complex census JSON data into simplified format.

This script converts the complex nested structure from 3_1_3Q9M-CSVR-T893.json
into a simplified format matching the structure used in the index-creation test.
"""

import json

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
        "attachedPersons": [],
        "hints": []
    }

    # Add occupation if present
    if occupation:
        person["occupation"] = occupation

    return person

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
        "people": people
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
