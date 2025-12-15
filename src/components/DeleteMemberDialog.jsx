import PropTypes from 'prop-types';
import { DialogOverlay } from "../../ux-zion-library/src/components/DialogOverlay";
import { Paragraph } from "../../ux-zion-library/src/components/Paragraph";
import { spacing } from "../../ux-zion-library/src/tokens/spacing";

export const DeleteMemberDialog = ({
  isOpen,
  memberName,
  onDeleteCompletely,
  onMoveToOwnGroup,
  onCancel
}) => {
  return (
    <DialogOverlay
      isOpen={isOpen}
      close={onCancel}
      title="Remove Member"
      size="md"
      primaryButton={{
        label: 'Delete Completely',
        onClick: onDeleteCompletely,
        variant: 'danger'
      }}
      secondaryButton={{
        label: 'Move to Own Group',
        onClick: onMoveToOwnGroup
      }}
    >
      <Paragraph size="sm" style={{ marginBottom: spacing.xs }}>
        What would you like to do with <strong>{memberName}</strong>?
      </Paragraph>

      <Paragraph size="sm" style={{ marginBottom: spacing.xs }}>
        <strong>Delete Completely:</strong> This person will be removed from the document entirely.
      </Paragraph>

      <Paragraph size="sm">
        <strong>Move to Own Group:</strong> This person will be placed in their own record group.
      </Paragraph>
    </DialogOverlay>
  );
};

DeleteMemberDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  memberName: PropTypes.string.isRequired,
  onDeleteCompletely: PropTypes.func,
  onMoveToOwnGroup: PropTypes.func,
  onCancel: PropTypes.func
};
