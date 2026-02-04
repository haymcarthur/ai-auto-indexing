import { useState } from 'react';
import PropTypes from 'prop-types';
import { FullPageOverlay } from "../../ux-zion-library/src/components/FullPageOverlay";
import { ImageViewer } from "../../ux-zion-library/src/components/ImageViewer";
import { InfoSheet } from "../../ux-zion-library/src/components/InfoSheet";
import { IconButton } from "../../ux-zion-library/src/components/IconButton";
import { Button } from "../../ux-zion-library/src/components/Button";
import { Paragraph } from "../../ux-zion-library/src/components/Paragraph";
import { DocumentRecordPerson, NoticeInfo } from "../../ux-zion-library/src/icons";
import { NamesInfoSheet } from './NamesInfoSheet';
import { InstructionPanel } from './InstructionPanel';
import { useTestSession } from '../contexts/TestSessionContext';
import { validateTask } from '../utils/taskValidation';
import censusDataJson from '../../KentuckyCensus-simple.json';
import imageUrl from "../../ux-zion-library/src/assets/Records/KentuckyCensusRecords.jpg";

export const StartingScreen = () => {
  const [showNamesSheet, setShowNamesSheet] = useState(false);
  const [showInfoSheet, setShowInfoSheet] = useState(false);
  const [censusData, setCensusData] = useState(censusDataJson);

  // Get test session context
  const {
    recording,
    testComplete,
    handleRecordingStart,
    handleTaskComplete
  } = useTestSession();

  // Handle task completion button click (now receives survey responses from InstructionPanel)
  const onTaskComplete = (surveyResponses) => {
    handleTaskComplete(censusData, validateTask, surveyResponses);
  };

  // Prepare images array for ImageViewer
  const images = [{
    src: imageUrl,
    alt: 'Kentucky Census Records'
  }];

  // Secondary buttons (low-emphasis with labels and icons)
  const secondaryButtons = [
    {
      label: 'Names',
      icon: DocumentRecordPerson,
      onClick: () => {
        setShowInfoSheet(false);
        setShowNamesSheet(true);
      }
    },
    {
      label: 'Information',
      icon: NoticeInfo,
      onClick: () => {
        setShowNamesSheet(false);
        setShowInfoSheet(true);
      }
    }
  ];

  // Primary button config
  const primaryButtonConfig = {
    label: 'Save Record',
    onClick: () => console.log('Save record clicked')
  };

  // Show thank you screen when test is complete
  if (testComplete) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '40px',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '16px', color: '#059669' }}>
            Thank You!
          </h1>
          <p style={{ fontSize: '18px', marginBottom: '24px', color: '#6b7280' }}>
            Your responses have been recorded successfully.
          </p>
          <p style={{ fontSize: '16px', color: '#9ca3af' }}>
            You can now close this window.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <FullPageOverlay
        isOpen={true}
        close={() => {}}
        hideBackButton={true}
        title="United States Census, 1950: Glendale. Census 1950"
        secondaryButtons={secondaryButtons}
        primaryButton={primaryButtonConfig}
      >
        <ImageViewer images={images} />
      </FullPageOverlay>

      {showNamesSheet && (
        <NamesInfoSheet
          censusData={censusData}
          onUpdateCensusData={setCensusData}
          onClose={() => setShowNamesSheet(false)}
        />
      )}

      {showInfoSheet && (
        <InfoSheet
          title="Information"
          close={() => setShowInfoSheet(false)}
          size="lg"
          elevated={false}
        >
          <Paragraph secondary style={{ marginTop: '16px' }}>
            Information panel coming soon...
          </Paragraph>
        </InfoSheet>
      )}

      {/* Instruction Panel */}
      <InstructionPanel
        onRecordingStart={handleRecordingStart}
        onTaskComplete={onTaskComplete}
        isRecording={recording.isRecording}
        recordingError={recording.error}
        startRecording={recording.startRecording}
        recordingStopped={recording.recordingStopped}
      />
    </>
  );
};
