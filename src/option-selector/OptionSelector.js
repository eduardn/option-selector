import {Item, useListState} from 'react-stately';
import {usePress, useKeyboard, FocusRing} from 'react-aria';
import classNames from 'classnames';

import './OptionSelector.css';

const Option = (props) => {
    const {item, state: {selectionManager}, ariaRole, persistSelection} = props;
    const isSelected = selectionManager.isSelected(item.key);
    const isDisabled = !selectionManager.canSelectItem(item.key);

    const {pressProps} = usePress({
        onPress: (pressEvent) => {
            if (selectionManager.selectionMode === 'multiple' && isSelected && persistSelection) {
                // Don't allow deselection of this item once selected
                return;
            }

            return !isDisabled && selectionManager.select(item.key, pressEvent)
        },
        preventFocusOnPress: true,
    })

    const ariaProps = {
        role: ariaRole,
        'aria-checked': isSelected,
        'aria-disabled': isDisabled,
    }

    const classes = classNames({
        selected: isSelected,
        disabled: isDisabled
    }, 'option')

    return (
        <FocusRing focusClass="focused">
            <div
                tabIndex="0"
                {...pressProps}
                {...ariaProps}
                className={classes}>
                {item.rendered}
            </div>
        </FocusRing>
    );;
};

const OptionSelector = (props) => {
    const persistSelection = props.persistSelection;
    const selectionMode = props.selectionMode || 'single';
    const selectionBehavior = selectionMode === 'single' ? 'replace' : 'toggle';
    const disallowEmptySelection = selectionMode === 'single' ? true : false;

    const listState = useListState({...props, selectionMode, selectionBehavior, disallowEmptySelection});

    const items = [...listState.collection];

    const {keyboardProps} = useKeyboard({
        onKeyUp: (event) => {
            console.log('>>>>> KEY UP');
            console.log(listState.collection.at(1));
        }
    })

    const ariaRoles = {
        containerAriaRole: props.selectionMode === 'single' ? 'radiogroup' : '',
        itemAriaRole: props.selectionMode === 'single' ? 'radio' : 'checkbox',
    }

    return (
        <div
            {...keyboardProps}
            aria-label={props['aria-label']}
            className="option-selector"
            role={ariaRoles.containerAriaRole}
        >
            {items.map(item => (
                <Option
                    persistSelection={persistSelection}
                    ariaRole={ariaRoles.itemAriaRole}
                    key={item.key}
                    state={listState}
                    item={item} />
            ))}
        </div>
    );

};

export {OptionSelector, Item};