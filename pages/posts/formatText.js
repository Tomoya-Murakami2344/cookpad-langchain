export default function formatText(text){
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