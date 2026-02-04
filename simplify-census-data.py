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

def build_person(person_elem, element_map):
    """Build simplified person object from PERSON element"""
    person_id = person_elem['id']

    # Get all descendant FIELD elements recursively
    all_fields = get_all_descendant_fields(person_id, element_map)

    # Extract fields
    given_name = None
    surname = None
    relationship = None
    occupation = None
    sex = ""
    age = ""
    race = ""

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

        if ft == 'NAME_GN':
            given_name = text
        elif ft == 'NAME_SURN':
            surname = text
        elif ft == 'REL_TYPE':
            relationship = text
        elif ft == 'OCCUPATION':
            occupation = text
        elif ft == 'SEX' or ft == 'SEX_CODE' or ft == 'GENDER':
            sex = text
        elif ft == 'AGE':
            age = text
        elif ft == 'RACE':
            race = text

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

def transform_to_simplified(complex_data):
    """Main transformation function"""
    elements = complex_data.get('elements', [])
    print(f"Processing {len(elements)} elements...")

    element_map = build_element_map(elements)

    # Find all RECORD elements
    records = []
    for elem in elements:
        if elem.get('elementType') == 'RECORD':
            record = build_record(elem, element_map)
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
