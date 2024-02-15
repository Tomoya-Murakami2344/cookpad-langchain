import { useRouter } from "next/router";
import { useState } from 'react';
import { useRef } from 'react';
// import styles from '../styles/globals.css';
import styles from './styles/module.css';
// import handleAddPictureClick from '../../components/picture';

const NewRecipePage = () => {
    const router = useRouter();
    const backtoHome = () => {
        router.push('/');
    };
    const [recipeName, setRecipeName] = useState('');
    // instrctions は現在の状態
    const [instructions, setInstructions] = useState(['', '', '']);
    const [additionalInstructions, setAdditionalInstructions] = useState([]);
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef();
    // 写真のステートは必要に応じて追加
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // レシピデータの送信または保存のロジック
    };
    
    const handleAddPictureClick = () => {
        // router.push('/components/picture');
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
    }
    const triggerFileInput = () => {
        fileInputRef.current.click();
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImage(file);
          setPreview(URL.createObjectURL(file));
          setCreateObjectURL(URL.createObjectURL(file));
        }
    }
    // 指示を更新する関数
    const updateInstruction = (index, value) => {
        // instructions のコピーを作成
        const newInstructions = [...instructions];
        newInstructions[index] = value;
        setInstructions(newInstructions);
    };
    // テキストエリアの削除
    const delInstruction = () => {
      setInstructions(instructions.slice(0, -1));
    };
    // 新しい指示のテキストエリアを追加
    const addInstruction = () => {
        setInstructions([...instructions, '']);
    };

    // Enter キーで新しいテキストエリアを追加
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        event.preventDefault();
        addInstruction()
        }
    };
  
    return (
      <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <div className="mb-4">
            <label>
            写真
            </label>
        </div>
        <img className="flex justify-center items-center" src={createObjectURL} style={{ width: '80%' }} />
        <label htmlFor="file-input" className="bg-primary-900 text-white-900 dark:bg-dark-900 flex justify-center items-center px-4 py-2 rounded mb-6 w-full" ></label>
        <input id="file-input" className="hidden" type="file" accept="image/*" name="myImage" onChange={handleImageChange} />
            {!createObjectURL && <svg xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 hover:cursor-pointer hover:bg-gray-700"
            fill="none" viewBox="0 0 256 25" stroke="black" strokeWidth="2"
            >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>}
        </div>
      <div style={{ flex: 1 }}>
          <label
            className={styles.bigText}
          >レシピ名:
          </label>
          <br />
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            // className={styles.inputCreamColor}
          />
        <br />
        <div>
          <label>作り方:</label>
        {instructions.map((instruction, index) => (
          <div key={index}>
          <textarea
            value={instruction}
            onChange={(e) => updateInstruction(index, e.target.value)}
          />
          </div>
        ))}
        </div>
      
        <button type="button" onClick={addInstruction}>➕</button>
        <button type="button" onClick={delInstruction}>➖</button>
        <br />
        <br />
        <button type="submit">レシピを保存</button>
        <button 
            onClick={backtoHome}
            type="submit">ホームへ
        </button>
        </div>
        </div>
      </form>
    );
  };
  
export default NewRecipePage;