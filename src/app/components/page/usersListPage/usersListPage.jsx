import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import PropTypes from "prop-types";
import API from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import _ from "lodash";
import UserTable from "../../ui/usersTable";
import SearchInput from "../../searchInput";

const UsersListPage = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();
    const [searchText, setSearchResult] = useState("");

    const handleSearch = ({ target }) => {
        setSearchResult(target.value);
        setSelectedProf(undefined);
    };

    useEffect(() => {
        API.users.fetchAll().then((data) =>
            setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleProfessionsSelect = (item) => {
        if (searchText !== "") setSearchResult("");
        setSelectedProf(item);
    };

    const handleReset = () => {
        setSelectedProf();
    };

    useEffect(() => {
        API.professions.fetchAll().then((data) =>
            setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, setSearchResult]);

    if (users) {
        const filteredUsers = searchText
            ? users.filter((user) => user.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
            : selectedProf
                ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
                : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div className="d-flex">
                {professions &&
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList items={professions} onItemSelect={handleProfessionsSelect} selectedItem={selectedProf} />
                        <button onClick={handleReset} className="btn btn-primary mt-2">Очистить</button>
                    </div>
                }
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <SearchInput value={searchText} onSearch={handleSearch} />
                    {count > 0 && <>
                        <UserTable users={userCrop} onSort={handleSort} selectedSort={sortBy} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
                        <div className="d-flex">
                            <Pagination currentPage={currentPage} itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange} />
                        </div>
                    </>
                    }
                </div>
            </div>
        );
    };
    return "Загрузка...";
};

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
