import React from 'react';
import { IconList } from '../../molecules';


interface SideBarMenu {
    value: string;
    title: string;
    icon: React.ReactNode;
}

interface SideBarMenuProps {
    categories: SideBarMenu[];
    onSelectCategory: (categoryTitle: string) => void;
    title?: string;
    initialSelect: string;
}

const SideBarMenu: React.FC<SideBarMenuProps> = ({ categories, onSelectCategory, title, initialSelect }) => {
    return (
        <IconList items={categories} onSelect={onSelectCategory} title={title} initialSelect={initialSelect} />
    );
};

export default SideBarMenu;
