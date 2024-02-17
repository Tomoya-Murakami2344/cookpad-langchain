import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import countUp from "./countUp";
import formatText from "./formatText";

export async function getServerSideProps(context) {
    const query = context.query;
    const {ingredients, recipeName} = query;
    return {props: {ingredients, recipeName}};
}

function Name({ingredients, recipeName}){
    const [data, setData] = useState("")
    const [isLoading, setIsLoading] = useState(true);

    // エンドポイントからデータを取得する
    useEffect(() => {
    const fetchData = async () => {
        try{
            setIsLoading(true);
            const endpoint = encodeURI(`${process.env.NEXT_PUBLIC_API_URL}/api/data/${ingredients}/${recipeName}`);
            const res = await fetch(endpoint);
            const json = await res.json();
            setData(json);
            console.log("status",res.status);
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
            {isLoading ? (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p> Now Loading...</p>
                    <p style={{ fontSize: "10px" }}>  30秒から1分ほど時間がかかることがあります </p>
                    <p style={{ fontSize: "10px" }}>  Render のサーバーが15分でスリープ状態になるため、1度目のアクセス時にはさらに時間がかかります </p>
                    <p style={{ fontSize: "10px" }}>  {time}秒経過 </p>
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