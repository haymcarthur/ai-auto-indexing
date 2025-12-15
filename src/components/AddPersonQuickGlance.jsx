import { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from "../../ux-zion-library/src/components/TextField";
import { Button } from "../../ux-zion-library/src/components/Button";
import { Header } from "../../ux-zion-library/src/components/Header";
import { spacing } from "../../ux-zion-library/src/tokens/spacing";

export const AddPersonQuickGlance = ({ fullName, onSave, onCancel }) => {
  // Parse full name into given name and surname
  const nameParts = fullName.trim().split(' ');
  const defaultSurname = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  const defaultGivenName = nameParts.length > 1
    ? nameParts.slice(0, -1).join(' ')
    : nameParts[0] || '';

  const [givenName, setGivenName] = useState(defaultGivenName);
  const [surname, setSurname] = useState(defaultSurname);

  const handleSave = () => {
    if (!givenName.trim()) return;
    onSave({ givenName: givenName.trim(), surname: surname.trim() });
  };

  return (
    <div style={{ width: '300px' }}>
      <Header level="h6" style={{ marginBottom: spacing.xxs }}>
        Add New Person
      </Header>

      <div style={{ marginBottom: spacing.xs }}>
        <TextField
          label="Given Name"
          value={givenName}
          onChange={(e) => setGivenName(e.target.value)}
          autoFocus
        />
      </div>

      <div style={{ marginBottom: spacing.xs }}>
        <TextField
          label="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: spacing.nano }}>
        <Button
          variant="blue"
          emphasis="medium"
          onClick={onCancel}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          variant="blue"
          emphasis="high"
          onClick={handleSave}
          fullWidth
          disabled={!givenName.trim()}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

AddPersonQuickGlance.propTypes = {
  fullName: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
