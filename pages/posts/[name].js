import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import countUp from "./countUp";
import formatText from "./formatText";

export async function getServerSideProps(context) {
    const query = context.query;
    const {ingredients, recipeName} = query;
    return {props: {ingredients, recipeName}};
}

async function customFetch(url){
    try{
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = response.json();
        return json;
    } catch(error){
        console.error('Error:', error);
    }
}

function Name({ingredients, recipeName}){
    const [data, setData] = useState("")
    const [recipeNameGlobal, setRecipeNameMade]     = useState("")
    const [ingredientsGlobal, setIngredientsMade]   = useState("")
    const [instructionsGlobal, setInstructionsMade] = useState("")
    const [isLoadingAll, setIsLoadingAll] = useState(true);
    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [isLoading3, setIsLoading3] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    // エンドポイントからデータを取得する
    useEffect(() => {
    const fetchData = async () => {
        try{
            setIsLoading(true);
            // 全ての情報の取得
            const endpoint = encodeURI(`${process.env.NEXT_PUBLIC_API_URL}/api/data/${ingredients}/${recipeName}`);
            // 一部の情報の取得
            const recipeNameMade   = encodeURI(`${process.env.NEXT_PUBLIC_API_URL}/api/data/${ingredients}/${recipeName}/1`);
            const ingredientsMade  = encodeURI(`${process.env.NEXT_PUBLIC_API_URL}/api/data/${ingredients}/${recipeName}/2`);
            // const instructionsMade = encodeURI(`${process.env.NEXT_PUBLIC_API_URL}/api/data/${ingredients}/${recipeName}/3`);

            // 全ての情報の取得
            const jsonAll = customFetch(endpoint);
            // setData(jsonAll);

            // データの取得
            // 1
            const json1 = await customFetch(recipeNameMade);
            setIsLoading1(false);
            setRecipeNameMade(json1);
            // 2
            const json2 = await customFetch(ingredientsMade);
            setIsLoading2(false);
            setIngredientsMade(json2);
            // 3
            // const json3 = customFetch(instructionsMade);
            // setInstructionsMade(json3);

            // Promise.race([json1, json2, json3, jsonAll]).then(() => setIsLoading(false));

            // それぞれのデータの取得が完了したらローディングを終了する
            // json1.then(() => setIsLoading1(false));
            // json2.then(() => setIsLoading2(false));
            // json3.then(() => setIsLoading3(false));
            await jsonAll.then(
                data => setData(data),
                () => setIsLoading(false)
            );

        }
        catch(error){
            // エラー時にはエラーメッセージを表示する
            setIsLoading(false);
        }
        finally{
            setIsLoading(false);
        }
    };
    fetchData();
    }, []);
    // カウントアップの処理
    let time = countUp();

    try{
    return (
        <div>
            {isLoading1 ? (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p> Now Loading...</p>
                    <p style={{ fontSize: "10px" }}>  30秒から1分ほど時間がかかることがあります </p>
                    <p style={{ fontSize: "10px" }}>  デプロイ先のサーバーが15分でスリープ状態になるため、1度目のアクセス時にはさらに時間がかかります </p>
                    <p style={{ fontSize: "10px" }}>  {time}秒経過 </p>
                </div>
            ) : isLoading2 ? (
                <div>
                    <h1> {recipeNameGlobal.recipeName} </h1>
                    <p> 現在、材料と手順を生成中です </p>
                </div>
            ) : isLoading ?  (
                <div>
                    <h1> {recipeNameGlobal.recipeName} </h1>
                    <h2> 材料: </h2>
                    <li> {ingredientsGlobal.ingredients} </li>
                    <p> 現在、手順を生成中です </p>
                </div>
            ) : (
                <div>
                    {formatText(data.content)}
                    <h3> 参考にしたメニュー </h3>
                    <ul>
                        <li> {ingredients} を使った料理 </li>
                        <ul>
                            {data.urls.ingredients.map((url) => {
                                return <li key={url}><a href={url}>{url}</a></li>
                            })}
                        </ul>
                        <li> {recipeName} を使った料理 </li>
                        <ul>
                            {data.urls.recipes.map((url) => {
                                return <li key={url}><a href={url}>{url}</a></li>
                            })}
                        </ul>
                    </ul>
                </div>
            )}
        </div>
    );
    }catch(error){
        return (
        <div>データの取得に失敗しました
            <ul>
                <li> 他の食材やメニューを試してみてください</li>
                <li> それでも改善しない場合はお問い合わせください </li>
            </ul>
        </div>
        );
    }
}
export default Name;