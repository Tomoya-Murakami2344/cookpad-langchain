import Image from 'next/image'
import styles from './page.module.css'
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from "next/router";
import AddRecipeButton from '../components/Button';
const products = [{ name: "bag" }, { name: "shoes" }, { name: "socks" }, {name: "posts"}];

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
      <div>
        <AddRecipeButton onClick={handleAddRecipeClick} />
      </div>
      <div className={styles.card}>
        <ul>
          {products.map((product) => {
            return (
              <li key={product.name}>
                <Link href={`/product/${product.name}`}>
                   {product.name}
                </Link>
              </li>
            );
          })}
          <li>
            <Link href=
              {
                {
                  pathname: '/product/shoes',
                  query: { name: 'Vercel' },
                }
              }
            >
              bbout
            </Link>
          </li>
          <li>
            <input
              type="text"
              placeholder="食材"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <p>を使った</p>
            <input
              type="text"
              placeholder="料理名"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
            <p>を</p>
            <Link href= 
              {
                {
                  pathname: `/posts/new_recipe`,
                  query: { ingredients: ingredients, recipeName: recipeName },
                }
              }
            > 
              検索
            </Link>
          </li>
        </ul>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  )
}
