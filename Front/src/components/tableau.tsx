import styles from './tableau.module.css'
export function Tableau(props:{text: string, title: string}){
    return (
        <>
            <h2 className={styles.yellow}>{props.title}</h2>
            <button>{props.text}</button>
        </>
    )
}