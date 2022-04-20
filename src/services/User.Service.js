import Instance from "../helper/Axios";  

const url = "apiusers";

export async function GetUsers() {
    try { 
        const response = await Instance.get(url);
        return await response.data;
    } catch (err) {
        console.log("error", err);
    }
}

export async function GetUsersWithSize(currentPage, pageSize, search) {
    try { 
        const response = await Instance.get(url + `/withSize/${currentPage}/${pageSize}` + `?search=${search}`);
        return await response.data;
    } catch (err) {
        console.log("error", err);
    }
}

export async function DeleteUser(id,del) {
    try { 
        const response = await Instance.delete(url + "/" + `${id}` + "?del=" + del); 
        return await response.data;
    } catch (err) {
        console.log("error", err);
    }
}

export async function PostLogin(form) {
    try { 
        let formData = new FormData();
        formData.append("email", form.email);
        formData.append("password", form.password);
        const response = await Instance.post(url + "/login",formData); 
        return await response.data;
    } catch (err) {
        console.log("error", err);
    }
}

export async function PostRegister(form) {
    try { 
        let formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("password", form.password);
        const response = await Instance.post(url + "/register",formData); 
        return await response.data;
    } catch (err) {
        console.log("error", err);
    }
}

export async function PutUserStatus(v) {
    try { 
        let formData = new FormData();
        formData.append("id", v.id);
        formData.append("name", v.name);
        formData.append("email", v.email);
        formData.append("password", v.password);
        formData.append("isused", 1);
        const response = await Instance.put(url,formData); 
        return await response.data;
    } catch (err) {
        console.log("error", err);
    }
}