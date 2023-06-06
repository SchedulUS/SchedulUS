export function Tableau(props:{text: string, title: string}){
    return (
        <>
            <h2>{props.title}</h2>
            <button>{props.text}</button>
        </>
    )
}