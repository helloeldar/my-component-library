import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import './Table.css';

function Table({
    columns,
    data,
    showToolbar = false,
    toolbarActions = [],
    striped = false,
    selectedRowIndex = null,
    onRowClick,
    className,
    ...props
}) {
    const containerClasses = [
        'table-container',
        className
    ].filter(Boolean).join(' ');

    const tableClasses = [
        'table',
        striped ? 'table-striped' : ''
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses} {...props}>
            {showToolbar && (
                <div className="table-toolbar">
                    {toolbarActions.map((action, index) => (
                        <button
                            key={index}
                            className="table-toolbar-button"
                            onClick={action.onClick}
                            title={action.title}
                        >
                            {action.icon ? (
                                <Icon name={action.icon} size={16} />
                            ) : (
                                action.label
                            )}
                        </button>
                    ))}
                </div>
            )}
            <div className={tableClasses}>
                <div className="table-header">
                    <div className="table-row">
                        {columns.map((column, index) => (
                            <div
                                key={column.key || index}
                                className="table-header-cell"
                                style={column.width ? { width: column.width } : {}}
                            >
                                {column.title}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="table-body">
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <div
                                key={row.id || rowIndex}
                                className={`table-row ${selectedRowIndex === rowIndex ? 'selected' : ''}`}
                                onClick={() => onRowClick && onRowClick(row, rowIndex)}
                            >
                                {columns.map((column, colIndex) => (
                                    <div
                                        key={column.key || colIndex}
                                        className="table-cell"
                                    >
                                        {column.icon && row[column.key] ? (
                                            <div className="table-cell-content">
                                                <Icon
                                                    name={typeof column.icon === 'function' ? column.icon(row) : column.icon}
                                                    size={16}
                                                    className="table-cell-icon"
                                                />
                                                <span>{row[column.key]}</span>
                                            </div>
                                        ) : column.render ? (
                                            column.render(row[column.key], row, rowIndex)
                                        ) : (
                                            row[column.key]
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="table-empty">
                            No data
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.node.isRequired,
            width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
            render: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    showToolbar: PropTypes.bool,
    toolbarActions: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string,
            label: PropTypes.node,
            title: PropTypes.string,
            onClick: PropTypes.func,
        })
    ),
    striped: PropTypes.bool,
    selectedRowIndex: PropTypes.number,
    onRowClick: PropTypes.func,
    className: PropTypes.string,
};

export default Table;

