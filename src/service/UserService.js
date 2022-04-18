import moment from 'moment';

export default class UserService {

    getUsers() {
        const url = "https://run.mocky.io/v3/9ea07671-86ea-4b0a-9b3b-0f195ccab3a3";
        return fetch(url).then(res => res.json());
    }

    getUsersDetail() {
        const url = "https://run.mocky.io/v3/0faaa10a-c0ca-4d79-944b-02bc6e00a02d";
        return fetch(url).then(res => {

            return res.text().then(data => {

                var lines = data.split('\n');
                var newData = "";
                for (var i = 0; i < lines.length; i++) {

                    if (lines[i].trim().length > 1 && lines[i].trim().search(",") == -1) {
                        newData += lines[i].trim() + ",";
                    } else {
                        newData += lines[i].trim() + "";
                    }

                }

                return JSON.parse(newData.replaceAll(",}", "}"));

            });

        });
    }

    getUsersCourses() {
        const url = "https://run.mocky.io/v3/041cfdde-2ef3-4a8e-b622-763613da672d";
        return fetch(url).then(res => {

            return res.json().then(data => {

                return data.map((item) => {

                    item.courses.measured_at = moment(item.courses.measured_at).format("HH:mm:ss");

                    if (item.courses.length === undefined) {
                        item.courses = [item.courses];
                        return item;
                    }

                    return item;
                });
            });

        });
    }

} 