#!/usr/bin/env python3
"""
Update relationships in KentuckyCensus-simple.json based on manual verification.
"""

import json

# Person ID mapping
PEOPLE = {
    # Record 1 - John & Reamy Ockerman family
    'John Ockerman (31)': '1:1:X7YY-L4QZ',
    'Reamy Ockerman': '1:1:X7YY-NPRG',
    'George Ockerman (6)': '1:1:X7YY-NPRB',
    'Isaic Ockerman': '1:1:X7YY-2TS6',
    'Joseph Ockerman': '1:1:X7YY-2TSX',
    'Christopher Ockerman': '1:1:X7YY-2TSF',

    # Record 3 - John D Ockerman family
    'John D Ockerman': '1:1:X7YY-B92N',
    'Absolom': '1:1:X7YY-R2VS',
    'Marion': '1:1:X7YY-YYWV',
    'Julia': '1:1:X7YY-B92J',
    'John (28)': '1:1:X7YY-B92V',
    'Mollie': '1:1:X7YY-R2V3',
    'Maggie': '1:1:X7YY-TD5R',
    'Charles Guthrea': '1:1:X7YY-TD5Y',

    # Record 4 - George Ockerman & Kitty family
    'George Ockerman (34)': '1:1:X7YY-B92S',
    'Kitty': '1:1:X7YY-B923',
    'Emmorin': '1:1:X7YY-R2JY',
    'Luella': '1:1:X7YY-TD5K',
    'John (1)': '1:1:X7YY-TD5L',
    'Ida Susan': '1:1:X7YY-YYWX',
    'Thompson Ockerman': '1:1:X7YY-B92Z',
}

# Manual relationship definitions
RELATIONSHIPS = {
    # Record 1 - John & Reamy Ockerman family
    'John Ockerman (31)': [
        ('COUPLE', 'SPOUSE', 'Reamy Ockerman'),
        ('PARENT_CHILD', 'PARENT', 'George Ockerman (6)'),
        ('PARENT_CHILD', 'PARENT', 'Isaic Ockerman'),
        ('PARENT_CHILD', 'PARENT', 'Joseph Ockerman'),
        ('PARENT_CHILD', 'PARENT', 'Christopher Ockerman'),
    ],
    'Reamy Ockerman': [
        ('COUPLE', 'SPOUSE', 'John Ockerman (31)'),
        ('PARENT_CHILD', 'PARENT', 'George Ockerman (6)'),
        ('PARENT_CHILD', 'PARENT', 'Isaic Ockerman'),
        ('PARENT_CHILD', 'PARENT', 'Joseph Ockerman'),
        ('PARENT_CHILD', 'PARENT', 'Christopher Ockerman'),
    ],
    'George Ockerman (6)': [
        ('PARENT_CHILD', 'CHILD', 'John Ockerman (31)'),
        ('PARENT_CHILD', 'CHILD', 'Reamy Ockerman'),
        ('SIBLING', 'SIBLING', 'Isaic Ockerman'),
        ('SIBLING', 'SIBLING', 'Joseph Ockerman'),
        ('SIBLING', 'SIBLING', 'Christopher Ockerman'),
    ],
    'Isaic Ockerman': [
        ('PARENT_CHILD', 'CHILD', 'John Ockerman (31)'),
        ('PARENT_CHILD', 'CHILD', 'Reamy Ockerman'),
        ('SIBLING', 'SIBLING', 'George Ockerman (6)'),
        ('SIBLING', 'SIBLING', 'Joseph Ockerman'),
        ('SIBLING', 'SIBLING', 'Christopher Ockerman'),
    ],
    'Joseph Ockerman': [
        ('PARENT_CHILD', 'CHILD', 'John Ockerman (31)'),
        ('PARENT_CHILD', 'CHILD', 'Reamy Ockerman'),
        ('SIBLING', 'SIBLING', 'George Ockerman (6)'),
        ('SIBLING', 'SIBLING', 'Isaic Ockerman'),
        ('SIBLING', 'SIBLING', 'Christopher Ockerman'),
    ],
    'Christopher Ockerman': [
        ('PARENT_CHILD', 'CHILD', 'John Ockerman (31)'),
        ('PARENT_CHILD', 'CHILD', 'Reamy Ockerman'),
        ('SIBLING', 'SIBLING', 'George Ockerman (6)'),
        ('SIBLING', 'SIBLING', 'Isaic Ockerman'),
        ('SIBLING', 'SIBLING', 'Joseph Ockerman'),
    ],

    # Record 3 - John D Ockerman family
    'John D Ockerman': [
        ('PARENT_CHILD', 'PARENT', 'Absolom'),
        ('PARENT_CHILD', 'PARENT', 'Marion'),
        ('PARENT_CHILD', 'PARENT', 'Julia'),
        ('PARENT_CHILD', 'PARENT', 'John (28)'),
        ('GRAND_PARENT', 'GRANDPARENT', 'Mollie'),
        ('PARENT_CHILD_IN_LAW', 'PARENT_IN_LAW', 'Maggie'),
        ('PARENT_CHILD_IN_LAW', 'PARENT_IN_LAW', 'Charles Guthrea'),
    ],
    'Absolom': [
        ('PARENT_CHILD', 'CHILD', 'John D Ockerman'),
        ('SIBLING', 'SIBLING', 'Marion'),
        ('SIBLING', 'SIBLING', 'Julia'),
        ('SIBLING', 'SIBLING', 'John (28)'),
        ('AUNT_OR_UNCLE', 'AUNT_OR_UNCLE', 'Mollie'),
        ('SIBLING_IN_LAW', 'SIBLING_IN_LAW', 'Maggie'),
        ('SIBLING_IN_LAW', 'SIBLING_IN_LAW', 'Charles Guthrea'),
    ],
    'Mollie': [
        ('GRAND_PARENT', 'GRANDCHILD', 'John D Ockerman'),
        ('PARENT_CHILD', 'CHILD', 'Marion'),
        ('AUNT_OR_UNCLE', 'NIECE_OR_NEPHEW', 'Julia'),
        ('AUNT_OR_UNCLE', 'NIECE_OR_NEPHEW', 'John (28)'),
        ('AUNT_OR_UNCLE', 'NIECE_OR_NEPHEW', 'Absolom'),
        ('PARENT_CHILD', 'CHILD', 'Maggie'),
        ('AUNT_OR_UNCLE', 'NIECE_OR_NEPHEW', 'Charles Guthrea'),
    ],
    'Maggie': [
        ('PARENT_CHILD_IN_LAW', 'CHILD_IN_LAW', 'John D Ockerman'),
        ('COUPLE', 'SPOUSE', 'Marion'),
        ('SIBLING_IN_LAW', 'SIBLING_IN_LAW', 'Julia'),
        ('SIBLING_IN_LAW', 'SIBLING_IN_LAW', 'John (28)'),
        ('SIBLING_IN_LAW', 'SIBLING_IN_LAW', 'Absolom'),
        ('PARENT_CHILD', 'PARENT', 'Mollie'),
        ('SIBLING_IN_LAW', 'SIBLING_IN_LAW', 'Charles Guthrea'),
    ],
    'Charles Guthrea': [
        ('PARENT_CHILD_IN_LAW', 'CHILD_IN_LAW', 'John D Ockerman'),
        ('SIBLING_IN_LAW', 'SIBLING_IN_LAW', 'Marion'),
        ('COUPLE', 'SPOUSE', 'Julia'),
        ('SIBLING_IN_LAW', 'SIBLING_IN_LAW', 'John (28)'),
        ('SIBLING_IN_LAW', 'SIBLING_IN_LAW', 'Absolom'),
        ('AUNT_OR_UNCLE', 'AUNT_OR_UNCLE', 'Mollie'),
        ('SIBLING_IN_LAW', 'SIBLING_IN_LAW', 'Maggie'),
    ],
    'Marion': [
        ('PARENT_CHILD', 'CHILD', 'John D Ockerman'),
        ('SIBLING_IN_LAW', 'SIBLING_IN_LAW', 'Charles Guthrea'),
        ('SIBLING', 'SIBLING', 'Julia'),
        ('SIBLING', 'SIBLING', 'John (28)'),
        ('SIBLING', 'SIBLING', 'Absolom'),
        ('PARENT_CHILD', 'PARENT', 'Mollie'),
        ('COUPLE', 'SPOUSE', 'Maggie'),
    ],
    'Julia': [
        ('PARENT_CHILD', 'CHILD', 'John D Ockerman'),
        ('COUPLE', 'SPOUSE', 'Charles Guthrea'),
        ('SIBLING', 'SIBLING', 'Marion'),
        ('SIBLING', 'SIBLING', 'John (28)'),
        ('SIBLING', 'SIBLING', 'Absolom'),
        ('AUNT_OR_UNCLE', 'AUNT_OR_UNCLE', 'Mollie'),
        ('SIBLING_IN_LAW', 'SIBLING_IN_LAW', 'Maggie'),
    ],
    'John (28)': [
        ('PARENT_CHILD', 'CHILD', 'John D Ockerman'),
        ('SIBLING_IN_LAW', 'SIBLING_IN_LAW', 'Charles Guthrea'),
        ('SIBLING', 'SIBLING', 'Marion'),
        ('SIBLING', 'SIBLING', 'Julia'),
        ('SIBLING', 'SIBLING', 'Absolom'),
        ('AUNT_OR_UNCLE', 'AUNT_OR_UNCLE', 'Mollie'),
        ('SIBLING_IN_LAW', 'SIBLING_IN_LAW', 'Maggie'),
    ],

    # Record 4 - George Ockerman & Kitty family
    'George Ockerman (34)': [
        ('PARENT_CHILD', 'PARENT', 'Emmorin'),
        ('PARENT_CHILD', 'PARENT', 'Luella'),
        ('PARENT_CHILD', 'PARENT', 'John (1)'),
        ('PARENT_CHILD', 'PARENT', 'Ida Susan'),
        ('PARENT_CHILD', 'PARENT', 'Thompson Ockerman'),
        ('COUPLE', 'SPOUSE', 'Kitty'),
    ],
    'Emmorin': [
        ('PARENT_CHILD', 'CHILD', 'George Ockerman (34)'),
        ('SIBLING', 'SIBLING', 'Luella'),
        ('SIBLING', 'SIBLING', 'John (1)'),
        ('SIBLING', 'SIBLING', 'Ida Susan'),
        ('SIBLING', 'SIBLING', 'Thompson Ockerman'),
        ('PARENT_CHILD', 'CHILD', 'Kitty'),
    ],
    'Luella': [
        ('PARENT_CHILD', 'CHILD', 'George Ockerman (34)'),
        ('SIBLING', 'SIBLING', 'Emmorin'),
        ('SIBLING', 'SIBLING', 'John (1)'),
        ('SIBLING', 'SIBLING', 'Ida Susan'),
        ('SIBLING', 'SIBLING', 'Thompson Ockerman'),
        ('PARENT_CHILD', 'CHILD', 'Kitty'),
    ],
    'John (1)': [
        ('PARENT_CHILD', 'CHILD', 'George Ockerman (34)'),
        ('SIBLING', 'SIBLING', 'Luella'),
        ('SIBLING', 'SIBLING', 'Emmorin'),
        ('SIBLING', 'SIBLING', 'Ida Susan'),
        ('SIBLING', 'SIBLING', 'Thompson Ockerman'),
        ('PARENT_CHILD', 'CHILD', 'Kitty'),
    ],
    'Ida Susan': [
        ('PARENT_CHILD', 'CHILD', 'George Ockerman (34)'),
        ('SIBLING', 'SIBLING', 'Luella'),
        ('SIBLING', 'SIBLING', 'John (1)'),
        ('SIBLING', 'SIBLING', 'Emmorin'),
        ('SIBLING', 'SIBLING', 'Thompson Ockerman'),
        ('PARENT_CHILD', 'CHILD', 'Kitty'),
    ],
    'Thompson Ockerman': [
        ('PARENT_CHILD', 'CHILD', 'George Ockerman (34)'),
        ('SIBLING', 'SIBLING', 'Luella'),
        ('SIBLING', 'SIBLING', 'John (1)'),
        ('SIBLING', 'SIBLING', 'Ida Susan'),
        ('SIBLING', 'SIBLING', 'Emmorin'),
        ('PARENT_CHILD', 'CHILD', 'Kitty'),
    ],
    'Kitty': [
        ('COUPLE', 'SPOUSE', 'George Ockerman (34)'),
        ('PARENT_CHILD', 'PARENT', 'Luella'),
        ('PARENT_CHILD', 'PARENT', 'John (1)'),
        ('PARENT_CHILD', 'PARENT', 'Ida Susan'),
        ('PARENT_CHILD', 'PARENT', 'Thompson Ockerman'),
        ('PARENT_CHILD', 'PARENT', 'Emmorin'),
    ],
}

def get_person_name(person_id, people_data):
    """Get person name from ID"""
    for record in people_data['records']:
        for person in record['people']:
            if person['id'] == person_id:
                given = person.get('givenName', '')
                surname = person.get('surname', '')
                return f"{given} {surname}".strip() or "Unknown"
    return "Unknown"

def main():
    # Load current data
    with open('KentuckyCensus-simple.json', 'r') as f:
        data = json.load(f)

    # Build ID to person map
    id_to_person = {}
    for record in data['records']:
        for person in record['people']:
            id_to_person[person['id']] = person

    # Update relationships for each person
    for person_key, rel_list in RELATIONSHIPS.items():
        person_id = PEOPLE.get(person_key)
        if not person_id:
            print(f"Warning: No ID found for {person_key}")
            continue

        person_obj = id_to_person.get(person_id)
        if not person_obj:
            print(f"Warning: No person found for ID {person_id}")
            continue

        # Build relationships array
        relationships = []
        for rel_type, role, related_key in rel_list:
            related_id = PEOPLE.get(related_key)
            if not related_id:
                print(f"Warning: No ID found for related person {related_key}")
                continue

            related_name = get_person_name(related_id, data)

            relationships.append({
                "type": rel_type,
                "role": role,
                "relatedPersonId": related_id,
                "relatedPersonName": related_name
            })

        # Update person's relationships
        person_obj['relationships'] = relationships
        print(f"Updated {person_key}: {len(relationships)} relationships")

    # Save updated data
    with open('KentuckyCensus-simple.json', 'w') as f:
        json.dump(data, f, indent=2)

    print("\n✓ Relationships updated successfully!")

if __name__ == '__main__':
    main()
