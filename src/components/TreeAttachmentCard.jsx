import PropTypes from 'prop-types';
import { Card } from '../../../ux-zion-library/src/components/Card';
import { Button } from '../../../ux-zion-library/src/components/Button';
import { Header } from '../../../ux-zion-library/src/components/Header';
import { Paragraph } from '../../../ux-zion-library/src/components/Paragraph';
import { ListItem } from '../../../ux-zion-library/src/components/ListItem';
import { Avatar } from '../../../ux-zion-library/src/components/Avatar';
import { LogoFamilysearch, ContentAttached } from '../../../ux-zion-library/src/icons';
import { colors } from '../../../ux-zion-library/src/tokens/colors';
import { spacing } from '../../../ux-zion-library/src/tokens/spacing';

export const TreeAttachmentCard = ({
  type = 'unattached', // 'hint' | 'unattached' | 'attached'
  data = {},
  onAttachHint,
  onAttachManually
}) => {
  const renderHeader = () => {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xxs,
        marginBottom: spacing.xs
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: colors.green.green05,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <LogoFamilysearch
            size="sm"
            style={{ color: colors.green.green90 }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Header level="h5" style={{ color: colors.gray.gray100 }}>
            Tree Attachment
          </Header>
        </div>
      </div>
    );
  };

  const renderHintState = () => {
    if (!data.hint) return null;

    return (
      <div style={{
        backgroundColor: colors.blue.blue02,
        padding: '8px',
        borderRadius: '4px'
      }}>
        <Header level="h6" style={{ marginBottom: spacing.xxs }}>
          Possible Tree Match
        </Header>

        <div style={{ marginBottom: spacing.xxs }}>
          <ListItem
            dense={true}
            emphasized={true}
            startElement={
              <Avatar
                size="sm"
                sex={data.hint.sex}
                initials={data.hint.initials}
              />
            }
            heading={data.hint.name}
            subheading={`${data.hint.birthYear} – ${data.hint.deathYear} • ${data.hint.pid}`}
          />
        </div>

        <div style={{ display: 'flex', gap: spacing.nano }}>
          <Button
            variant="blue"
            emphasis="medium"
            onClick={onAttachHint}
            fullWidth
          >
            Attach Hint
          </Button>
          <Button
            variant="blue"
            emphasis="low"
            onClick={onAttachManually}
            fullWidth
          >
            Attach manually
          </Button>
        </div>
      </div>
    );
  };

  const renderUnattachedState = () => {
    return (
      <>
        <Paragraph size="sm" secondary style={{ fontStyle: 'italic', marginBottom: spacing.xs }}>
          No Tree Attachments
        </Paragraph>
        <Button
          variant="blue"
          emphasis="medium"
          onClick={onAttachManually}
        >
          Attach to Tree
        </Button>
      </>
    );
  };

  const renderAttachedState = () => {
    if (!data.attachment) return null;

    return (
      <>
        <Header level="h6" style={{ marginBottom: spacing.xxs }}>
          Attached in Tree to
        </Header>

        <ListItem
          dense={true}
          emphasized={true}
          startElement={
            <Avatar
              size="sm"
              sex={data.attachment.sex}
              initials={data.attachment.initials}
            />
          }
          heading={data.attachment.name}
          subheading={`${data.attachment.birthYear}–${data.attachment.deathYear} • ${data.attachment.pid}`}
          endElement={
            <ContentAttached
              style={{ color: colors.blue.blue60 }}
            />
          }
        />
      </>
    );
  };

  return (
    <Card variant="outlined" size="xxs">
      {renderHeader()}

      {type === 'hint' && renderHintState()}
      {type === 'unattached' && renderUnattachedState()}
      {type === 'attached' && renderAttachedState()}
    </Card>
  );
};

TreeAttachmentCard.propTypes = {
  type: PropTypes.oneOf(['hint', 'unattached', 'attached']),
  data: PropTypes.shape({
    hint: PropTypes.shape({
      name: PropTypes.string,
      sex: PropTypes.string,
      initials: PropTypes.string,
      birthYear: PropTypes.string,
      deathYear: PropTypes.string,
      pid: PropTypes.string
    }),
    attachment: PropTypes.shape({
      name: PropTypes.string,
      sex: PropTypes.string,
      initials: PropTypes.string,
      birthYear: PropTypes.string,
      deathYear: PropTypes.string,
      pid: PropTypes.string
    })
  }),
  onAttachHint: PropTypes.func,
  onAttachManually: PropTypes.func
};
