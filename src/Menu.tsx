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
        <ActionIcon 
            className="menu-button"
            onClick={props.onClick}
            radius="xl"
            variant="default"
        >
            <IconMenu2 />
        </ActionIcon>
        </>
    )
}

export const Menu = (props: MenuProps) => {
    return (
    <>
    <div className="menu">
        <div onClick={props.onFlashCardClick}>
            Flash Cards
        </div>
        <br />
        <div onClick={props.onMatchingClick}>
            Matching Game
        </div>
        <Select
            label="Select Language"
            data={['Vietnamese', 'Spanish']}
            defaultValue={props.currentLanguage}
            onChange={props.onLanguageSelect}
        />
    </div>
    </>
    )
}
