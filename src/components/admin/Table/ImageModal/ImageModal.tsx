import styles from './ImageModal.module.scss';
import close from '../../../../assets/close.svg'

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    altText?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageSrc, altText }) => {
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`}
            onClick={handleBackgroundClick}
            role="dialog"
            aria-modal="true"
        >
            <div className={styles.modalContent}>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close Modal"
                >
                    <img src={close} alt={'close'}/>
                </button>
                <img src={imageSrc} alt={altText || 'Full Image'} className={styles.modalImage} />
            </div>
        </div>
    );
};
