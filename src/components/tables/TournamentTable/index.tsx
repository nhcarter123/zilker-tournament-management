import React, { useState } from 'react';
import moment from 'moment';
import naturalCompare from 'string-natural-compare';

import { Table } from 'antd';
import DeleteTournamentButton from 'components/buttons/DeleteTournamentButton';
import AddTournamentButton from 'components/buttons/AddTournamentButton';
import TableSearchBar from 'components/TableSearchBar';

import { Tournament } from 'types/types';
import { useStyles } from 'components/tables/TournamentTable/styles';
import { useHistory } from 'react-router-dom';
import { Page } from 'types/page';

// type EditableTableProps = Parameters<typeof Table>[0];
// type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

type TournamentsTableProps = {
  isAdmin: boolean;
  tournaments: Tournament[];
};

const TournamentsTable = ({
  isAdmin,
  tournaments
}: TournamentsTableProps): JSX.Element => {
  const history = useHistory();
  const classes = useStyles();
  const [filterTerm, setFilterTerm] = useState('');

  console.log(filterTerm);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: {
        compare: (a: Tournament, b: Tournament): number =>
          naturalCompare(a.name, b.name)
      },
      render: (name: string, record: Tournament): JSX.Element => (
        <a
          onClick={(): void => {
            history.push(
              Page.EditTournament.replace(':tournamentId', record._id)
            );
          }}
        >
          {name}
        </a>
      )
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date: Date): string => moment(date).format('ll'),
      sorter: {
        compare: (a: Tournament, b: Tournament): number =>
          moment(a.date).unix() - moment(b.date).unix()
      }
    },
    // {
    //   title: 'Average Rating',
    //   dataIndex: 'avgRating',
    //   width: '15%',
    //   sorter: {
    //     compare: (a: Tournament, b: Tournament): number =>
    //       (a.avgRating || 0) - (b.avgRating || 0)
    //   }
    // },
    // {
    //   title: 'Max Rating',
    //   dataIndex: 'maxRating',
    //   width: '15%',
    //   sorter: {
    //     compare: (a: Tournament, b: Tournament): number =>
    //       (a.maxRating || 0) - (b.maxRating || 0)
    //   }
    // },
    {
      dataIndex: 'delete',
      width: '50px',
      render: (_: any, record: Tournament): JSX.Element =>
        isAdmin ? <DeleteTournamentButton _id={record._id} /> : <></>
    }
  ];

  return (
    <div className={classes.root}>
      <TableSearchBar
        renderButton={(): JSX.Element =>
          isAdmin ? <AddTournamentButton /> : <></>
        }
        setFilterTerm={setFilterTerm}
      />
      <Table
        className={classes.table}
        columns={columns}
        dataSource={tournaments}
        size={'small'}
        // pagination={{ pageSize: 50 }}
        pagination={false}
        rowKey={'_id'}
        sticky
      />
    </div>
  );
};
export default TournamentsTable;
