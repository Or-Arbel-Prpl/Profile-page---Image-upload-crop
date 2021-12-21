import React, {useState, useCallback, useEffect, useRef} from 'react';
import {DropZone, Thumbnail, Caption, Stack, Card, Button, Modal, Image} from '@shopify/polaris';
import {NoteMinor} from '@shopify/polaris-icons';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


export default function FileUpload() {
    const [active, setActive] = useState(false);
    const toggleActive = useCallback(() => setActive((active) => !active), []);
    const [crop, setCrop] = useState({ aspect: 3 / 2 });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [imagUrl, setImgUrl] = useState();
    const [cropProps, setCropProps] = useState({});
    const [file, setFile] = useState();
  const [upImg, setUpImg] = useState();
  const [prev,setPrev] = useState();

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);




    const handleDropZoneDrop = useCallback(
      (_dropFiles, acceptedFiles, _rejectedFiles) =>{
        setFile((file) => acceptedFiles[0]);
        setCrop({ aspect: 3 / 2 });

      //   const reader = new FileReader();
      // reader.addEventListener('load', () => {
      //   setUpImg(reader.result);
      //   console.log(upImg)
      // });
      },
      [],
    );
  
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  
    const fileUpload = 
        // !file && 
        <DropZone.FileUpload actionTitle='Add file' actionHint='or drop files to upload'/>;

    const activator = 
            <DropZone 
            allowMultiple={false} 
            // onDrop={handleDropZoneDrop} 
            onClick={()=> setActive(true)}
            >
            {/* {uploadedFile} */}
            {fileUpload}
            </DropZone>
    
    const handleImageLoaded = () => {
        console.log('image:' + window.URL.createObjectURL(file));
    }

    // const onLoad = useCallback(
    //   (img) => {
    //     // @ts-ignore
    //     imgRef.current = img;
  
    //     setTimeout(() => setCrop({ width: img.width / 2, aspect: 3/2 }), 0);
    //   },
    //   [upImg],
    // );

    const onLoad = useCallback((img) => {
      imgRef.current = img;
    }, []);

    const handleOnCropComplete = (crop, pixelCrop) => {
        // console.log('crop complete');
        // setCompletedCrop(crop);
        console.log(crop, pixelCrop);
        setCropProps({})
    }

    function getCroppedImg(image, crop, fileName) {
        
        const canvas = document.createElement("canvas");
        // const canvas = previewCanvasRef.current;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
      
        // New lines to be added
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";
      
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
      
        // console.log(canvas);
        // As Base64 string
        // const base64Image = canvas.toDataURL("image/jpeg");
        // return base64Image;
      
        // As a blob
        return new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              blob.name = fileName;
              resolve(blob);
            },
            "image/jpeg",
            1
          );
        });

        
      }


      const test = async() => {
        // const image = new Image();
        // image.src = file.src;
        
        
        const croppedImg = await getCroppedImg(imgRef.current, completedCrop, file.name);
        console.log(croppedImg);
        // setPrev(croppedImg);

        
        // var reader = new FileReader();
        // reader.readAsDataURL(croppedImg);
        // setPrev(reader);

      }
      
      useEffect(() => {
          test();
          // console.log(completedCrop)
      }, [completedCrop])

    return (
        <Modal
          activator={activator}
          open={active}
          onClose={toggleActive}
          primaryAction={{
            content: 'Upload',
            onAction: toggleActive,
          }}
        >

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Modal.Section>
              {file? 
                <div style={{width: '300px'}}>


                <ReactCrop 
                    src={window.URL.createObjectURL(file)} 
                    crop={crop} 
                    onImageLoaded={onLoad}
                    onComplete={(crop) => setCompletedCrop(crop)}
                    // onDragEnd = {(event)=> console.log(event.target) }
                    // onDragEnd = {(event)=> console.log(event) }
                    // onChange={newCrop => console.log(newCrop)} 
                    onChange={newCrop => setCrop(newCrop)} 
                />

                </div>
              :
            <DropZone
            accept= {validImageTypes}
            errorOverlayText="Please upload am image"
            type="file"
            onDrop={handleDropZoneDrop} 
            >
                
                <DropZone.FileUpload actionTitle='Add file' actionHint='or drop files to upload'/>
               
            </DropZone>
              
            }

            </Modal.Section>

            <Modal.Section>
                <div style={{width: '150px', height: '75px', border: '1px dashed black', textAlign: 'center'}}>
                    Preview image 
                    {/* {prev && <p>{prev.result}</p>} */}
                    {/* <img src={prev.result} alt='image' /> */}

                </div>
            </Modal.Section>
            </div>

        </Modal>

    )
}

