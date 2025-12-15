import PropTypes from 'prop-types';
import { DialogOverlay } from '../../../ux-zion-library/src/components/DialogOverlay';
import { Paragraph } from '../../../ux-zion-library/src/components/Paragraph';
import { spacing } from '../../../ux-zion-library/src/tokens/spacing';

export const AddPersonDetailsDialog = ({
  isOpen,
  personName,
  onAddDetails,
  onSkip
}) => {
  return (
    <DialogOverlay
      isOpen={isOpen}
      close={onSkip}
      title="Add Person Details"
      size="md"
      primaryButton={{
        label: 'Add Details',
        onClick: onAddDetails
      }}
      secondaryButton={{
        label: 'Skip',
        onClick: onSkip
      }}
    >
      <Paragraph size="sm" style={{ marginBottom: spacing.xs }}>
        <strong>{personName}</strong> has been added to the record.
      </Paragraph>

      <Paragraph size="sm">
        Would you like to add additional details for this person now?
      </Paragraph>
    </DialogOverlay>
  );
};

AddPersonDetailsDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  personName: PropTypes.string.isRequired,
  onAddDetails: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired
};
