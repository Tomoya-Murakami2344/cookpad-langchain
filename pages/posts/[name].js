import { useRouter } from "next/router";
import { useState, useEffect } from 'react';

export async function getServerSideProps(context) {
    const query = context.query;
    const {ingredients, recipeName} = query;
    return {props: {ingredients, recipeName}};
}

function split_text(text){
    /*
    料理名：~ 
    材料：
    1. ~
    2. ~
    3. ~
    手順：
    1. ~
    2. ~
    3. ~
    以上のようなテキストから料理名、材料、手順を抽出する
    */
    try{
        const recipeName  = text.split("料理名：")[1].split("材料")[0];
        const ingredients = text.split("材料：")[1].split("手順")[0];
        const procedure   = text.split("手順：")[1];
    

    // 手順、材料は番号を見て分割する
    const procedure_list = [];
    const ingredients_list = [];
    let index = 1;
    while (true){
        let procedure_text = procedure.split(index + '.')[1];
        if (procedure_text == undefined){
            break;
        }
        else{
            procedure_text = procedure_text.split((index+1) + '.')[0];
        }
        procedure_list.push(procedure_text);
        index += 1;
    }
    index = 1;
    while (true){
        let ingredients_text = ingredients.split(index + '.')[1];
        if (ingredients_text == undefined){
            break;
        }
        else{
            ingredients_text = ingredients_text.split((index+1) + '.')[0];
        }
        ingredients_list.push(ingredients_text);
        index += 1;
    }
    return (
        <div>
            <h1>{recipeName}</h1>
            <h2>材料</h2>
            <ul>
                {ingredients_list.map((ingredient) => {
                    return <li key={ingredient}>{ingredient}</li>;
                })}
            </ul>
            <h2>手順</h2>
            <ol>
                {procedure_list.map((procedure) => {
                    return <li key={procedure}>{procedure}</li>;
                })}
            </ol>
        </div>
    );
    }
    catch(error){
        return <div>データの取得に失敗しました</div>;
    }
}

export default function Name({ingredients, recipeName}){
    const [data, setData] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
    const fetchData = async () => {
        try{
            setIsLoading(true);
            // const res = await fetch(`http://127.0.0.1:5000/api/data/${ingredients}/${recipeName}`); // FlaskサーバーのURL
            const res = await fetch (`http://{process.env.NEXT_PUBLIC_API_URL}/api/data/${ingredients}/${recipeName}`);
            const json = await res.json();
            setData(json);
            console.log("status",res.status);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    };
    fetchData();
    }, []);
    console.log("data", data, `from http://127.0.0.1:5000/api/data/${ingredients}/${recipeName}`);
    try{
    return (
        <div>
            {isLoading ? (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p> Now Loading...</p>
                    <p style={{ fontSize: "10px" }}>  30秒から1分ほど時間がかかることがあります </p>
                </div>
            ) : (
                <div>
                    {split_text(data.content)}
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