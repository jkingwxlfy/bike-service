import {useSelector} from "react-redux";

const useApprovedStaff = () => {
    const {staff} = useSelector(state => state.staffList);

    return staff.filter(item => {
        return item.approved;
    }).map(item => {
        return {name: item.email, value: item._id}
    });

}

export default useApprovedStaff;