import PropTypes from 'prop-types';
import { Card } from "../../ux-zion-library/src/components/Card";
import { Button } from "../../ux-zion-library/src/components/Button";
import { Header } from "../../ux-zion-library/src/components/Header";
import { Paragraph } from "../../ux-zion-library/src/components/Paragraph";
import { Alert } from "../../ux-zion-library/src/components/Alert";
import { ContentCheck } from "../../ux-zion-library/src/icons";
import { colors, transparentColors } from "../../ux-zion-library/src/tokens/colors";
import { spacing } from "../../ux-zion-library/src/tokens/spacing";

export const ReviewCard = ({
  state = 'pending', // 'pending' | 'add'
  currentPersonName = '',
  remainingPeople = [], // Array of names still needing details
  onSaveAndClose,
  onSaveAndAttach,
  onSaveAndContinue,
  onAddPerson,
  currentApproach = 'A', // 'A' or 'B' - determines which message to show
  isEditingExistingPerson = false // true when editing existing person in Task B
}) => {

  const getIconConfig = () => {
    if (state === 'add') {
      return {
        color: colors.yellow.yellow90,
        bg: colors.yellow.yellow05
      };
    }
    // pending
    return {
      color: colors.gray.gray50,
      bg: colors.gray.gray03
    };
  };

  const iconConfig = getIconConfig();

  const renderHeader = () => {
    const headingColor = state === 'pending' ? transparentColors.transparentGray40 : colors.gray.gray100;
    const showSubheading = state === 'pending' || state === 'add';

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xxs,
        marginBottom: state === 'pending' ? 0 : spacing.xs
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: iconConfig.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <ContentCheck
            size="sm"
            style={{ color: iconConfig.color }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Header level="h5" style={{ color: headingColor, marginBottom: showSubheading ? '2px' : 0 }}>
            Review
          </Header>
          {showSubheading && (
            <div style={{ fontSize: '12px', color: colors.gray.gray60 }}>
              Confirm Details and Add Name
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAddState = () => {
    const hasRemainingPeople = remainingPeople && remainingPeople.length > 0;

    return (
      <>
        {/* Task B (AI flow): Simple message without alert */}
        {currentApproach === 'B' ? (
          <Paragraph size="md" style={{ marginBottom: spacing.xs }}>
            If everything looks correct, you can save and close.
          </Paragraph>
        ) : (
          /* Task A: Alert and detailed message */
          <>
            <div style={{ marginBottom: spacing.xs }}>
              <Alert status="warning" outline>
                AI can make mistakes, please review to make sure all of the information is correct.
              </Alert>
            </div>

            <Paragraph size="sm" style={{ marginBottom: spacing.xs }}>
              {currentPersonName} is ready to add! If everything looks correct, {hasRemainingPeople
                ? 'you will now add the details for the following family members:'
                : 'you can save and close or you can add a missing person to this household.'}
            </Paragraph>
          </>
        )}

        {hasRemainingPeople && (
          <ul style={{
            marginBottom: spacing.xs,
            paddingLeft: '20px',
            fontSize: '14px',
            color: colors.gray.gray100
          }}>
            {remainingPeople.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        )}

        {hasRemainingPeople ? (
          <Button
            variant="blue"
            emphasis="high"
            onClick={onSaveAndContinue}
            fullWidth
          >
            Save and Continue
          </Button>
        ) : currentApproach === 'B' && isEditingExistingPerson ? (
          // Task B: Editing existing person - show Save and Close to return to review list
          <Button
            variant="blue"
            emphasis="high"
            onClick={() => {
              onSaveAndClose?.();
            }}
            fullWidth
          >
            Save and Close
          </Button>
        ) : currentApproach === 'B' ? (
          // Task B: Adding new person to record group - show Save and Continue (calls onSaveAndClose to return to review list)
          <Button
            variant="blue"
            emphasis="high"
            onClick={() => {
              onSaveAndClose?.();
            }}
            fullWidth
          >
            Save and Continue
          </Button>
        ) : (
          // Task A: Show Add Person and Save and Close
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.xxs }}>
            <Button
              variant="blue"
              emphasis="medium"
              onClick={() => {
                onAddPerson?.();
              }}
              fullWidth
            >
              Add Person
            </Button>
            <Button
              variant="blue"
              emphasis="high"
              onClick={() => {
                onSaveAndClose?.();
              }}
              fullWidth
            >
              Save and Close
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <Card
      variant={state === 'add' ? 'elevated' : 'outlined'}
      size="xxs"
    >
      {renderHeader()}
      {state === 'add' && renderAddState()}
    </Card>
  );
};

ReviewCard.propTypes = {
  state: PropTypes.oneOf(['pending', 'add']),
  currentPersonName: PropTypes.string,
  remainingPeople: PropTypes.arrayOf(PropTypes.string),
  onSaveAndClose: PropTypes.func,
  onSaveAndAttach: PropTypes.func,
  onSaveAndContinue: PropTypes.func,
  onAddPerson: PropTypes.func,
  currentApproach: PropTypes.oneOf(['A', 'B']),
  isEditingExistingPerson: PropTypes.bool
};
