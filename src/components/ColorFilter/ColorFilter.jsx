import { useState } from 'react';
import styles from './ColorFilter.module.scss';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { colorList } from '../../constant/colorData';
import classNames from 'classnames';

const ColorFilter = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedColor, setSelectedColor] = useState(null);

    const handleSelectColor = (id) => {
        setSelectedColor((prev) => (prev === id ? null : id));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.colorHeader}>
                <h5>Color</h5>
                <button
                    className={styles.btn}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </button>
            </div>

            <div className={classNames(styles.colorSection, {
                    [styles.open]: isOpen,
                })}>
                    {colorList.map((color) => {
                        const isSelected = selectedColor === color.id;
                        return (
                            <button
                                key={color.id}
                                type="button"
                                className={`${styles.colorBtn} ${color.hasBorder ? styles.hasBorder : ''}`}
                                style={{ backgroundColor: color.hex }}
                                onClick={() => handleSelectColor(color.id)}
                                aria-label={color.name}
                            >
                                {isSelected && (
                                    <Check
                                        size={16}
                                        color={color.hex === '#FFFFFF' ? '#000000' : '#FFFFFF'}
                                        strokeWidth={2.5}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
        </div>
    );
};

export default ColorFilter;