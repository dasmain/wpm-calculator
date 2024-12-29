import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Header = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div className="flex items-center gap-x-3">
      <span className="font-bold text-3xl">WPM Count</span>
      <div onClick={onOpenModal} className="cursor-pointer">
        <InfoOutlinedIcon />
      </div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        styles={{
          modal: {
            backgroundColor: "#292929",
            padding: "20px",
            borderRadius: "10px",
          },
        }}
      >
        <div className="text-left p-4">
          <h2 className="text-xl font-semibold mb-4">About WPM Count</h2>
          <p className="mb-2">
            This app helps you calculate your <strong>Words Per Minute (WPM)</strong> while typing. The goal is to type as accurately and quickly as possible within the set time limit.
          </p>
          <h3 className="text-lg font-medium mt-4">How it Works:</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Start typing the displayed text in the input box.</li>
            <li>Your WPM is calculated based on the number of words typed (1 word = 5 characters).</li>
            <li>You can choose between different time durations: 15s, 30s, or 60s.</li>
          </ul>
          <h3 className="text-lg font-medium mt-4">Important Notes:</h3>
          <ul className="list-disc list-inside pl-4">
            <li>Errors in typing are currently <strong>not factored into the WPM calculation</strong>.</li>
            <li>The app highlights errors in red to help improve accuracy.</li>
          </ul>
          <p className="mt-4">
            Practice regularly to improve both your typing speed and accuracy. Happy typing!
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
