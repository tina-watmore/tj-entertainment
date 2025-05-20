import styles from './InnerPageBanner.module.scss';

const InnerPageBanner = ({props}) => {
    
    return (
        <div className={styles.innerPageBanner}>
            <h1>{props.title}</h1>
        </div>        
    );
};

export default InnerPageBanner;
