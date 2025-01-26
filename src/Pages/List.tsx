import { useState, useEffect } from 'react';

import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';

import { Card } from '../Models/FlashCardsModel';

interface ListProps {
    cards: Card[];
}

const List = (props: ListProps) => {
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Card>>({
        columnAccessor: 'categories',
        direction: 'asc',
    });
    const [records, setRecords] = useState<Card[]>(sortBy(props.cards, 'categories'));

    useEffect(() => {
        const data = sortBy(props.cards, sortStatus.columnAccessor) as Card[];
        setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    return (
        <div className="list-container">
            <DataTable
                height={800}
                withTableBorder
                striped
                highlightOnHover
                shadow="xl"
                columns={[ 
                    { accessor: 'front', sortable: true }, 
                    { accessor: 'back', sortable: true }, 
                    { accessor: 'deck' }, 
                    { accessor: 'categories', sortable: true }
                ]}
                records={records}
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
            />
        </div>
    );
  }

export default List;