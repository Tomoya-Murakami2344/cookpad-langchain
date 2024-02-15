import { useState ,useRef } from 'react';

// 写真をPCから受け付けるためのコンポーネント
const handleAddPictureClick = () => {
    const [image, setImage] = useState('');
    // const [preview, setPreview] = useState(null);
    // const fileInputRef = useRef();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
          setImage(file);
          setPreview(URL.createObjectURL(file));
        }
      }
    const handleButtonClick = () => {
        fileInputRef.current.click();
    }
    return (
    <div>
        <button onClick={handleButtonClick}>画像をアップロード</button>
        <input
        type="file"
        ref={fileInputRef}
        accept="image/png"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        />
        {preview && <img src={preview} alt="Preview" />}
    </div>
    );
};
export default handleAddPictureClick;