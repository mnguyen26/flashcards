import { MantineProvider, Table, TableData } from '@mantine/core';

import { Card } from '../Models/FlashCardsModel';

import '../css/App.css';

interface ListProps {
    cards: Card[];
}

const List = (props: ListProps) => {

    const rows = props.cards.map((word) => (
        <Table.Tr key={word.id}>
            <Table.Td>{word.front}</Table.Td>
            <Table.Td>{word.back}</Table.Td>
            <Table.Td>{word.deck}</Table.Td>
            <Table.Td>{word.categories}</Table.Td>
        </Table.Tr>
        ));

    const ths = (
        <Table.Tr>
            <Table.Th>Front</Table.Th>
            <Table.Th>Back</Table.Th>
            <Table.Th>Deck</Table.Th>
            <Table.Th>Categories</Table.Th>
        </Table.Tr>
        );

    return (
        <>
        <MantineProvider>
        <div className="list-container">
        <Table.ScrollContainer minWidth={100}>
        <Table stickyHeader stickyHeaderOffset={0} striped highlightOnHover withTableBorder>
            <Table.Thead>{ths}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        </Table.ScrollContainer>
        </div>
        </MantineProvider>
        </>
    )
}

export default List;