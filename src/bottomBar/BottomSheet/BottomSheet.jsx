import { useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import BottomBar from "../BottomBar";
import './bottomSheet.css';

export default function BottomSheet() {
  return (
    <>
      <Sheet
        isOpen={true}
        snapPoints={[0.6, 190, 41]}
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