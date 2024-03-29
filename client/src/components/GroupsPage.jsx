import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
function GroupsPage() {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        // backend API
        fetch(`url`)
            .then(res => res.json())
            .then(data => setGroups(data.groups))
            .catch(err => console.log(err, 'error in fetching groups'))


    }, [])

    if (groups.length == 0) {
        return <div>No groups found. You can create a group by clicking 'Add group' button.</div>
    }
    else {
        return (
            <div>
                <h1>Your Groups</h1>
                {groups.map(group => (
                    <Link to={'/group/'+group.id} key={group.id}>
                        <h2>{group.name}</h2>
                    </Link>
                ))}
            </div>
        );
    }
}

export default GroupsPage
