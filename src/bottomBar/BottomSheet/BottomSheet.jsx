import { useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import BottomBar from "../bottomBar";
import './bottomSheet.css';

export default function BottomSheet() {
  return (
    <>
      <Sheet
        isOpen={true}
        snapPoints={[0.6, 188, 55]}
        initialSnap={1}
        onClose={() => {
          console.log('Sheet closed');
        }}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>{
            <BottomBar />
          }</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}