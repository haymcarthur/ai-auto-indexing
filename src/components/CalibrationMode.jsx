import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import imageUrl from "../../ux-zion-library/src/assets/Records/KentuckyCensusRecords.jpg";

/**
 * CalibrationMode Component
 *
 * Allows manual calibration of highlight coordinates for census records.
 * User selects a record group, draws highlights for each person, then exports corrected coordinates.
 */
const CalibrationMode = ({ censusData, imageSize, onClose }) => {
  const [currentRecordIndex, setCurrentRecordIndex] = useState(0);
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const [calibrationHighlights, setCalibrationHighlights] = useState({});
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState(null);
  const [currentBox, setCurrentBox] = useState(null);
  const imageRef = useRef(null);

  const currentRecord = censusData.records[currentRecordIndex];
  const currentPerson = currentRecord?.people[currentPersonIndex];
  const totalRecords = censusData.records.length;
  const totalPeopleInRecord = currentRecord?.people.length || 0;

  // Handle mouse down to start drawing
  const handleMouseDown = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setDrawStart({ x, y });
    setCurrentBox({ x, y, width: 0, height: 0 });
  };

  // Handle mouse move while drawing
  const handleMouseMove = (e) => {
    if (!isDrawing || !drawStart || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const width = currentX - drawStart.x;
    const height = currentY - drawStart.y;

    setCurrentBox({
      x: width < 0 ? currentX : drawStart.x,
      y: height < 0 ? currentY : drawStart.y,
      width: Math.abs(width),
      height: Math.abs(height)
    });
  };

  // Handle mouse up to finish drawing
  const handleMouseUp = () => {
    if (!isDrawing || !currentBox || !currentPerson) return;

    // Create new highlight for this person
    const newHighlight = {
      id: `${currentPerson.id}-${Date.now()}`,
      personId: currentPerson.id,
      x: Math.round(currentBox.x),
      y: Math.round(currentBox.y),
      width: Math.round(currentBox.width),
      height: Math.round(currentBox.height),
      selectable: true
    };

    // Add to the array of highlights for this person
    setCalibrationHighlights(prev => ({
      ...prev,
      [currentPerson.id]: [
        ...(prev[currentPerson.id] || []),
        newHighlight
      ]
    }));

    // Don't auto-advance - let user add more highlights or manually move forward

    setIsDrawing(false);
    setDrawStart(null);
    setCurrentBox(null);
  };

  // Next record group
  const handleNextRecord = () => {
    if (currentRecordIndex < totalRecords - 1) {
      setCurrentRecordIndex(currentRecordIndex + 1);
      setCurrentPersonIndex(0);
    }
  };

  // Previous record group
  const handlePrevRecord = () => {
    if (currentRecordIndex > 0) {
      setCurrentRecordIndex(currentRecordIndex - 1);
      setCurrentPersonIndex(0);
    }
  };

  // Previous person
  const handlePrevPerson = () => {
    if (currentPersonIndex > 0) {
      setCurrentPersonIndex(currentPersonIndex - 1);
    } else if (currentRecordIndex > 0) {
      setCurrentRecordIndex(currentRecordIndex - 1);
      const prevRecord = censusData.records[currentRecordIndex - 1];
      setCurrentPersonIndex(prevRecord.people.length - 1);
    }
  };

  // Skip current person
  const handleSkipPerson = () => {
    if (currentPersonIndex < totalPeopleInRecord - 1) {
      setCurrentPersonIndex(currentPersonIndex + 1);
    } else if (currentRecordIndex < totalRecords - 1) {
      setCurrentRecordIndex(currentRecordIndex + 1);
      setCurrentPersonIndex(0);
    }
  };

  // Jump to specific person
  const handleJumpToPerson = (personIdx) => {
    setCurrentPersonIndex(personIdx);
  };

  // Undo last highlight for current person
  const handleUndo = () => {
    if (currentPerson && calibrationHighlights[currentPerson.id]) {
      const personHighlights = calibrationHighlights[currentPerson.id];
      if (personHighlights.length > 1) {
        // Remove last highlight but keep the rest
        setCalibrationHighlights(prev => ({
          ...prev,
          [currentPerson.id]: personHighlights.slice(0, -1)
        }));
      } else {
        // Remove the person entry entirely if only one highlight
        const newHighlights = { ...calibrationHighlights };
        delete newHighlights[currentPerson.id];
        setCalibrationHighlights(newHighlights);
      }
    }
  };

  // Export calibration data
  const handleExport = () => {
    // Flatten the arrays into individual highlight objects
    const flattenedHighlights = {};
    Object.entries(calibrationHighlights).forEach(([personId, highlights]) => {
      highlights.forEach((highlight, index) => {
        // Use the original person ID format, with suffix if multiple highlights
        const key = highlights.length > 1 ? `${personId}-${index + 1}` : personId;
        flattenedHighlights[key] = {
          id: personId,
          x: highlight.x,
          y: highlight.y,
          width: highlight.width,
          height: highlight.height,
          selectable: true
        };
      });
    });

    const exportData = {
      calibrationDate: new Date().toISOString(),
      imageFile: "KentuckyCensusRecords.jpg",
      imageDimensions: imageSize,
      highlightCoordinates: flattenedHighlights,
      note: "Multiple highlights per person are numbered with -1, -2, etc. suffix"
    };

    // Download as JSON
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `highlight-calibration-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    const totalHighlights = Object.values(calibrationHighlights).reduce((sum, arr) => sum + arr.length, 0);
    alert(`Exported ${totalHighlights} highlight coordinates for ${Object.keys(calibrationHighlights).length} people!`);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex">
      {/* Main drawing area */}
      <div className="flex-1 overflow-auto bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div
            ref={imageRef}
            className="relative cursor-crosshair border-4 border-orange-500"
            style={{ width: imageSize.width, height: imageSize.height }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={imageUrl}
              alt="Census Record"
              className="w-full h-full pointer-events-none select-none"
              draggable={false}
            />

            {/* Show saved highlights */}
            {Object.entries(calibrationHighlights).map(([personId, highlights]) =>
              highlights.map((highlight, idx) => (
                <div
                  key={highlight.id}
                  className="absolute border-2 border-green-500 bg-green-500 opacity-30"
                  style={{
                    left: `${highlight.x}px`,
                    top: `${highlight.y}px`,
                    width: `${highlight.width}px`,
                    height: `${highlight.height}px`
                  }}
                />
              ))
            )}

            {/* Show current drawing box */}
            {currentBox && (
              <div
                className="absolute border-2 border-orange-500 bg-orange-500 opacity-50"
                style={{
                  left: `${currentBox.x}px`,
                  top: `${currentBox.y}px`,
                  width: `${currentBox.width}px`,
                  height: `${currentBox.height}px`
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Control panel */}
      <div className="w-96 bg-white border-l border-gray-300 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Calibration Mode</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Record {currentRecordIndex + 1} of {totalRecords} • Person {currentPersonIndex + 1} of {totalPeopleInRecord}
          </div>
        </div>

        {/* Current Person Info */}
        <div className="p-6 border-b border-gray-300 bg-orange-50">
          <h3 className="font-semibold text-gray-900 mb-2">Draw highlight for:</h3>
          <div className="space-y-1">
            <div className="text-lg font-bold text-orange-700">
              {currentPerson?.givenName} {currentPerson?.surname}
            </div>
            <div className="text-sm text-gray-600">ID: {currentPerson?.id}</div>
            <div className="text-sm text-gray-600">
              Relationship: {currentPerson?.relationship}
            </div>
            <div className="text-sm text-gray-600">Age: {currentPerson?.age}</div>
          </div>
        </div>

        {/* All people in current record */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="font-semibold text-gray-700 mb-3">People in this record (click to jump):</h3>
          <div className="space-y-2">
            {currentRecord?.people.map((person, idx) => (
              <div
                key={person.id}
                onClick={() => handleJumpToPerson(idx)}
                className={`p-3 rounded border cursor-pointer transition-colors ${
                  idx === currentPersonIndex
                    ? 'border-orange-500 bg-orange-50'
                    : calibrationHighlights[person.id]
                    ? 'border-green-500 bg-green-50 hover:bg-green-100'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium text-sm">
                  {person.givenName} {person.surname}
                  {calibrationHighlights[person.id] && ` ✓ (${calibrationHighlights[person.id].length})`}
                </div>
                <div className="text-xs text-gray-600">{person.relationship}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-300 space-y-2">
          <div className="text-sm text-gray-600 mb-4">
            Current person: {calibrationHighlights[currentPerson?.id]?.length || 0} highlight(s)
            <br />
            Total: {Object.values(calibrationHighlights).reduce((sum, arr) => sum + arr.length, 0)} highlights
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrevPerson}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              ← Prev Person
            </button>
            <button
              onClick={handleSkipPerson}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              Skip →
            </button>
          </div>

          <button
            onClick={handleUndo}
            disabled={!calibrationHighlights[currentPerson?.id]}
            className="w-full px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete Last Highlight ({calibrationHighlights[currentPerson?.id]?.length || 0})
          </button>

          <div className="flex gap-2">
            <button
              onClick={handlePrevRecord}
              disabled={currentRecordIndex === 0}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              ← Prev Record
            </button>
            <button
              onClick={handleNextRecord}
              disabled={currentRecordIndex === totalRecords - 1}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded hover:bg-orange-700 disabled:opacity-50"
            >
              Next Record →
            </button>
          </div>

          <button
            onClick={handleExport}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
          >
            Export Coordinates
          </button>
        </div>
      </div>
    </div>
  );
};

CalibrationMode.propTypes = {
  censusData: PropTypes.object.isRequired,
  imageSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default CalibrationMode;
