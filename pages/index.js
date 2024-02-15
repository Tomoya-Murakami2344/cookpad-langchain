import Image from 'next/image'
import styles from './page.module.css'
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from "next/router";
import AddRecipeButton from '../components/Button';

function Content() {
  return (
    <div>
      <p>ここにコンテンツが入ります。</p>
      <style jsx>{`
        p {
          color: orange;
        }
      `}</style>
    </div>
  );
}
function MyComponent(props) {
  const { name } = props;
  const { width, height } = props;
  return (
    <Image
      src={name}
      alt="kaki"
      width={width} // 画像の幅
      height={height} // 画像の高さ
      // layout="fill" // オプション: fixed, intrinsic, responsive, fill など
    />
  )
}

export default function Home() {
  const [ingredients, setIngredients] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const router = useRouter();
  const handleAddRecipeClick = () => {
    // ここで新しいレシピIDを生成（例: ランダムな文字列）
    const newRecipeId = Math.random().toString(32).substring(2);
    router.push(`/recipes/${newRecipeId}`);
  };
  return (
    <main className={styles.main}>
      {/* <div>
        <AddRecipeButton onClick={handleAddRecipeClick} />
      </div> */}
      <div className={styles.main}>
        <ul>
          <li>
            <input
              type="text"
              placeholder="食材"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            を使った
            <input
              type="text"
              placeholder="料理名"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
            を
              <Link legacyBehavior href= {{
                    pathname: `/posts/new_recipe`,
                    query: { ingredients: ingredients, recipeName: recipeName },
                }}
              >
                <a style={{ fontSize: '20px' }}>検索</a>
              </Link>
            {/* </div> */}
            </li>
        </ul>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
          <MyComponent name="/hourensou_spinach.png" width="100" height="100" />
          </div>
          <div style={{ flex: 1 }}>
          <MyComponent name="/plus.png" width="100" height="100" />
          </div>
          <div style={{ flex: 1 }}>
          <MyComponent name="/food_curryrice_white.png" width="100" height="100" />
          </div>
          <div style={{ flex: 1 }}>
          <MyComponent name="/arrow_right.png" width="100" height="100" />
          </div>
          <div style={{ flex: 1 }}>
          <MyComponent name="/food_curry_sagu_rice.png" width="100" height="100" />
          </div>
        </div>
      </div>
    </main>
  )
}
