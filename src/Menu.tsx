import { ActionIcon, Select } from '@mantine/core';

import { IconMenu2 } from '@tabler/icons-react';

interface MenuButtonProps {
    onClick: () => void;
}   

interface MenuProps {
    onFlashCardClick: () => void;
    onMatchingClick: () => void;
    currentLanguage: string;
    onLanguageSelect: (language: string | null) => void;
}

export const MenuButton = (props: MenuButtonProps) => {

    return (
        <>
        <div className="menu-button">
            <ActionIcon 
                onClick={props.onClick}
                radius="xl"
                variant="default"
            >
                <IconMenu2 />
            </ActionIcon>
            Menu
        </div>
        </>
    )
}

export const Menu = (props: MenuProps) => {
    return (
    <>
    <div className="menu">
        Menu
        <hr />
        <div className="menu-item" onClick={props.onFlashCardClick}>
            Flash Cards
        </div>
        <hr/>
        <div className="menu-item" onClick={props.onMatchingClick}>
            Matching Game
        </div>
        <hr/>
        <Select
            className="menu-item"
            label="Current Language"
            data={['Vietnamese', 'Spanish']}
            defaultValue={props.currentLanguage}
            onChange={props.onLanguageSelect}
        />
    </div>
    </>
    )
}
