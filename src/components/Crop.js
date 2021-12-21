import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Modal, DropZone,  } from '@shopify/polaris'

function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.download = 'cropPreview.png';
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    'image/png',
    1
  );
}

export default function App() {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [file, setFile] = useState();


  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

//   const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

//   const handleDropZoneDrop = useCallback(
//     (_dropFiles, acceptedFiles, _rejectedFiles) =>{
//       setFile((file) => acceptedFiles[0]);
//       setCrop({ aspect: 3 / 2 });

//     //   const reader = new FileReader();
//     // reader.addEventListener('load', () => {
//     //   setUpImg(reader.result);
//     //   console.log(upImg)
//     // });
//     },
//     [],
//   );

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);


  return (
      <React.Fragment>
           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Modal.Section>
          <div className="App">
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
        imageStyle={{width: '300px'}}
      />
      
        {/* <DropZone
            accept= {validImageTypes}
            errorOverlayText="Please upload am image"
            onImageLoaded={onLoad}
            type="file"
            onDrop={handleDropZoneDrop} 
            >
                
                <DropZone.FileUpload actionTitle='Add file' actionHint='or drop files to upload'/>
               
        </DropZone> */}
        
      
     
      {/* <button
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() =>
          generateDownload(previewCanvasRef.current, completedCrop)
        }
      >
        Download cropped image
      </button> */}
    </div>

            </Modal.Section>

            <Modal.Section>
               
                    {upImg ? 

                     <canvas
                     ref={previewCanvasRef}
                     // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                     style={{
                        //  width: Math.round(completedCrop?.width ?? 0),
                         width: '150px',
                        //  height: Math.round(completedCrop?.height ?? 0)
                     }}
                     />
                :
                    <div style={{width: '150px', height: '75px', border: '1px dashed black', textAlign: 'center'}}>
                        Preview image 
                        {/* {prev && <p>{prev.result}</p>} */}
                        {/* <img src={prev.result} alt='image' /> */}

                    </div>
                }
                    
               

             
            </Modal.Section>
            </div>


    
  </React.Fragment>
  );

}
