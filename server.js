
const fs = require("fs")
const port = 6789
const express = require("express")
const app = express()
app.use(express.static("public"))
const server = app.listen(port)
console.log(`Webserver is running on port ${port}.`)


const socket = require("socket.io")
const io = socket(server)

io.sockets.on("connection", (socket) => {
console.log(`Client ${socket.id} connected.`)

let disconnect = () => {
console.log(`Client ${socket.id} disconnected.`)
}

let get_data_2016 = () => {
    json_data = fs.readFileSync("../data_01/Feinstaub_2016.json", "utf8")
    let data = JSON.parse(json_data)
    socket.emit("data_2016", data)
}

let get_data_2017 = () => {
    json_data = fs.readFileSync("../data_01/Feinstaub_2017.json", "utf8")
    let data = JSON.parse(json_data)
    socket.emit("data_2017", data)
}

let get_data_2018 = () => {
    json_data = fs.readFileSync("../data_01/Feinstaub_2018.json", "utf8")
    let data = JSON.parse(json_data)
    socket.emit("data_2018", data)
}

let get_data_2019 = () => {
    json_data = fs.readFileSync("../data_01/Feinstaub_2019.json", "utf8")
    let data = JSON.parse(json_data)
    socket.emit("data_2019", data)
}

let visualisation = () => {
    console.log("Received request")
    var json_data = fs.readFileSync("../data_01/Feinstaub_2019.json", "utf8")
    var datafile = JSON.parse(json_data)
    let data = datafile.data
    let keys = Object.keys(data)
    var avgs = {};
    for (let i = 0; i < keys.length; i++){
        let entry = data[keys[i]]
        let keys_of_entry = Object.keys(entry)
        let sum = 0
        for (let j = 0; j < keys_of_entry.length; j++){
            let item = entry[keys_of_entry[j]]
            sum = sum + item[2]
            avg = sum/keys_of_entry.length
            if (avg != 0){
                avgs[i] = {avg};
            }
        }
    }
    socket.emit("visualisation", avgs)
}

let get_data_task_2 = () => {
    console.log("reading in data...")
    get_data_co()
    get_data_no2()
    get_data_o3()
    get_data_pm10()
    get_data_so2()
    console.log("read in data successfully")
}

let compute_averages_task_2 = () => {
    console.log("computing averages...")
    get_data_averages()
    console.log("computed averages successfully")
}

let get_data_co = () => {
    let preprocessed_content_CO_2016 = []
    let string_first = "../data/CO_data/CO_2016_"
    let string_optional = "0"
    for (let i = 1; i<=12 ; i++)
    {
        if(i > 9)
        {
            string_optional = ""
        }
        fs.readFile(string_first + string_optional + i.toString() + ".json", "utf8", (err, raw_data) => {
        if (err) {
           console.error(err)
        return
        }
    
        let data = JSON.parse(raw_data).data
        let keys = Object.keys(data)
        for (let j = 0; j < keys.length; j++)
        {
            let entry = data[keys[j]]
            let keys_of_entry = Object.keys(entry)
            let station = keys[j].toString()
            if (preprocessed_content_CO_2016.find(station_to_find => station_to_find.station_id == station) == undefined)
            {
                let new_station = {
                    station_id: station ,
                    CO: [] ,
                }
                preprocessed_content_CO_2016.push(new_station)
                //console.log("created object for station " + station)
            }
            for (let k = 0; k < keys_of_entry.length; k++)
            {
                let item = entry[keys_of_entry[k]]
                let item_co = preprocessed_content_CO_2016.find(item_co => item_co.station_id == station).CO
                if (item[2] !== null && Number.isNaN(item[2]) == false)
                {
                    item_co.push(item[2])
                }
                //console.log("added value " + item[2] + "for station " + station)

            }
        }
        /*
        fs.writeFile("firsttest" + i.toString() + ".json", JSON.stringify(preprocessed_content_CO_2016), (err) => {
            if (err) {
            console.error(err)
            }
            })
            */

        fs.writeFile("CO_2016.json", JSON.stringify(preprocessed_content_CO_2016), (err) => {
            if (err) {
            console.error(err)
            }
            })

            //console.log(preprocessed_content_CO_2016.find(station_to_find => station_to_find.station_id == "31").CO.length)

        })
    }


    fs.writeFile("CO_2016.json", JSON.stringify(preprocessed_content_CO_2016), (err) => {
    if (err) {
    console.error(err)
    }
    })  

    console.log("finished reading in CO")
        
}

let get_data_no2 = () => {
    let preprocessed_content_no2_2016 = []
    let string_first = "../data/NO2_data/NO2_2016_"
    let string_optional = "0"
    for (let i = 1; i<=12 ; i++)
    {
        if(i > 9)
        {
            string_optional = ""
        }
        fs.readFile(string_first + string_optional + i.toString() + ".json", "utf8", (err, raw_data) => {
        if (err) {
           console.error(err)
        return
        }
    
        let data = JSON.parse(raw_data).data
        let keys = Object.keys(data)
        for (let j = 0; j < keys.length; j++)
        {
            let entry = data[keys[j]]
            let keys_of_entry = Object.keys(entry)
            let station = keys[j].toString()
            if (preprocessed_content_no2_2016.find(station_to_find => station_to_find.station_id == station) == undefined)
            {
                let new_station = {
                    station_id: station ,
                    NO2: [] ,
                }
                preprocessed_content_no2_2016.push(new_station)
                //console.log("created object for station " + station)
            }
            for (let k = 0; k < keys_of_entry.length; k++)
            {
                let item = entry[keys_of_entry[k]]
                let item_no2 = preprocessed_content_no2_2016.find(item_no2 => item_no2.station_id == station).NO2
                if (item[2] !== null && Number.isNaN(item[2]) == false)
                {
                    item_no2.push(item[2])
                }                
                //console.log("added value " + item[2] + "for station " + station)

            }
        }
        /*
        fs.writeFile("firsttest" + i.toString() + ".json", JSON.stringify(preprocessed_content_CO_2016), (err) => {
            if (err) {
            console.error(err)
            }
            })
            */

        fs.writeFile("NO2_2016.json", JSON.stringify(preprocessed_content_no2_2016), (err) => {
            if (err) {
            console.error(err)
            }
            })

            //console.log(preprocessed_content_no2_2016.find(station_to_find => station_to_find.station_id == "7").NO2.length)

        })

        
    }


    fs.writeFile("NO2_2016.json", JSON.stringify(preprocessed_content_no2_2016), (err) => {
    if (err) {
    console.error(err)
    }
    })

    console.log("finished reading in NO2")
        
}

let get_data_o3 = () => {
    let preprocessed_content_o3_2016 = []
    let string_first = "../data/O3_data/O3_2016_"
    let string_optional = "0"
    for (let i = 1; i<=12 ; i++)
    {
        if(i > 9)
        {
            string_optional = ""
        }
        fs.readFile(string_first + string_optional + i.toString() + ".json", "utf8", (err, raw_data) => {
        if (err) {
           console.error(err)
        return
        }
    
        let data = JSON.parse(raw_data).data
        let keys = Object.keys(data)
        for (let j = 0; j < keys.length; j++)
        {
            let entry = data[keys[j]]
            let keys_of_entry = Object.keys(entry)
            let station = keys[j].toString()
            if (preprocessed_content_o3_2016.find(station_to_find => station_to_find.station_id == station) == undefined)
            {
                let new_station = {
                    station_id: station ,
                    O3: [] ,
                }
                preprocessed_content_o3_2016.push(new_station)
                //console.log("created object for station " + station)
            }
            for (let k = 0; k < keys_of_entry.length; k++)
            {
                let item = entry[keys_of_entry[k]]
                let item_o3 = preprocessed_content_o3_2016.find(item_o3 => item_o3.station_id == station).O3
                if (item[2] !== null && Number.isNaN(item[2]) == false)
                {
                    item_o3.push(item[2])
                }
                //console.log("added value " + item[2] + "for station " + station)
            }
        }
        /*
        fs.writeFile("firsttest" + i.toString() + ".json", JSON.stringify(preprocessed_content_CO_2016), (err) => {
            if (err) {
            console.error(err)
            }
            })
            */

        fs.writeFile("O3_2016.json", JSON.stringify(preprocessed_content_o3_2016), (err) => {
            if (err) {
            console.error(err)
            }
            })
        })
    }


    fs.writeFile("O3_2016.json", JSON.stringify(preprocessed_content_o3_2016), (err) => {
    if (err) {
    console.error(err)
    }
    })

    console.log("finished reading in O3")

        
}

let get_data_pm10 = () => {
    let preprocessed_content_pm10_2016 = []
    let string_first = "../data/PM10_data/PM10_2016_"
    let string_optional = "0"
    for (let i = 1; i<=12 ; i++)
    {
        if(i > 9)
        {
            string_optional = ""
        }
        fs.readFile(string_first + string_optional + i.toString() + ".json", "utf8", (err, raw_data) => {
        if (err) {
           console.error(err)
        return
        }
    
        let data = JSON.parse(raw_data).data
        let keys = Object.keys(data)
        for (let j = 0; j < keys.length; j++)
        {
            let entry = data[keys[j]]
            let keys_of_entry = Object.keys(entry)
            let station = keys[j].toString()
            if (preprocessed_content_pm10_2016.find(station_to_find => station_to_find.station_id == station) == undefined)
            {
                let new_station = {
                    station_id: station ,
                    PM10: [] ,
                }
                preprocessed_content_pm10_2016.push(new_station)
                //console.log("created object for station " + station)
            }
            for (let k = 0; k < keys_of_entry.length; k++)
            {
                let item = entry[keys_of_entry[k]]
                let item_pm10 = preprocessed_content_pm10_2016.find(item_pm10 => item_pm10.station_id == station).PM10
                if (item[2] !== null && Number.isNaN(item[2]) == false)
                {
                    item_pm10.push(item[2])
                }
                //console.log("added value " + item[2] + "for station " + station)

            }
        }
        /*
        fs.writeFile("firsttest" + i.toString() + ".json", JSON.stringify(preprocessed_content_CO_2016), (err) => {
            if (err) {
            console.error(err)
            }
            })
            */

        fs.writeFile("PM10_2016.json", JSON.stringify(preprocessed_content_pm10_2016), (err) => {
            if (err) {
            console.error(err)
            }
            })
        })
    }


    fs.writeFile("PM10_2016.json", JSON.stringify(preprocessed_content_pm10_2016), (err) => {
    if (err) {
    console.error(err)
    }
    })

    console.log("finished reading in PM10")
        
}

let get_data_so2 = () => {
    let preprocessed_content_so2_2016 = []
    let string_first = "../data/SO2_data/SO2_2016_"
    let string_optional = "0"
    for (let i = 1; i<=12 ; i++)
    {
        if(i > 9)
        {
            string_optional = ""
        }
        fs.readFile(string_first + string_optional + i.toString() + ".json", "utf8", (err, raw_data) => {
        if (err) {
           console.error(err)
        return
        }
    
        let data = JSON.parse(raw_data).data
        let keys = Object.keys(data)
        for (let j = 0; j < keys.length; j++)
        {
            let entry = data[keys[j]]
            let keys_of_entry = Object.keys(entry)
            let station = keys[j].toString()
            if (preprocessed_content_so2_2016.find(station_to_find => station_to_find.station_id == station) == undefined)
            {
                let new_station = {
                    station_id: station ,
                    SO2: [] ,
                }
                preprocessed_content_so2_2016.push(new_station)
                //console.log("created object for station " + station)
            }
            for (let k = 0; k < keys_of_entry.length; k++)
            {
                let item = entry[keys_of_entry[k]]
                let item_so2 = preprocessed_content_so2_2016.find(item_so2 => item_so2.station_id == station).SO2
                if (item[2] !== null && Number.isNaN(item[2]) == false)
                {
                    item_so2.push(item[2])
                }
                //console.log("added value " + item[2] + "for station " + station)

            }
        }
        /*
        fs.writeFile("firsttest" + i.toString() + ".json", JSON.stringify(preprocessed_content_CO_2016), (err) => {
            if (err) {
            console.error(err)
            }
            })
            */

        fs.writeFile("SO2_2016.json", JSON.stringify(preprocessed_content_so2_2016), (err) => {
            if (err) {
            console.error(err)
            }
            })
        })
    }


    fs.writeFile("SO2_2016.json", JSON.stringify(preprocessed_content_so2_2016), (err) => {
    if (err) {
    console.error(err)
    }
    })

    console.log("finished reading in SO2")

}

let get_data_averages = () => {
    let preprocessed_content_averages = []
    fs.readFile("CO_2016.json", "utf8", (err, raw_data) => {
        if (err) {
            console.error(err)
        return
        }
        let data = JSON.parse(raw_data)
        for (let i = 0; i < data.length; i++)
        {
            let entry = data[i]
            let station = entry.station_id
            if (preprocessed_content_averages.find(station_to_find => station_to_find.station_id == station) == undefined)
            {
                let new_station = {
                    station_id: station ,
                    avg_co: null,
                    avg_no2: null,
                    avg_o3: null,
                    avg_pm10: null,
                    avg_so2: null,
                }
                preprocessed_content_averages.push(new_station)
            }
            let values = entry.CO
            let count = values.length
            let sum = 0
            for (let j = 0; j < count; j++)
            {
                sum = sum + values[j]
            }
            preprocessed_content_averages.find(station_to_find => station_to_find.station_id == station).avg_co = (sum / count).toFixed(2)
        }
        fs.writeFile("Averages_2016.json", JSON.stringify(preprocessed_content_averages), (err) => {
            if (err) {
            console.error(err)
            }
            })
        })

        fs.readFile("NO2_2016.json", "utf8", (err, raw_data) => {
            if (err) {
                console.error(err)
            return
            }
            let data = JSON.parse(raw_data)
            for (let i = 0; i < data.length; i++)
            {
                let entry = data[i]
                let station = entry.station_id
                if (preprocessed_content_averages.find(station_to_find => station_to_find.station_id == station) == undefined)
                {
                    let new_station = {
                        station_id: station ,
                        avg_co: null,
                        avg_no2: null,
                        avg_o3: null,
                        avg_pm10: null,
                        avg_so2: null,
                    }
                    preprocessed_content_averages.push(new_station)
                }
                let values = entry.NO2
                let count = values.length
                let sum = 0
                for (let j = 0; j < count; j++)
                {
                    sum = sum + values[j]
                }
                preprocessed_content_averages.find(station_to_find => station_to_find.station_id == station).avg_no2 = (sum / count).toFixed(2)
            }
            fs.writeFile("Averages_2016.json", JSON.stringify(preprocessed_content_averages), (err) => {
                if (err) {
                console.error(err)
                }
                })
            })

            fs.readFile("O3_2016.json", "utf8", (err, raw_data) => {
                if (err) {
                    console.error(err)
                return
                }
                let data = JSON.parse(raw_data)
                for (let i = 0; i < data.length; i++)
                {
                    let entry = data[i]
                    let station = entry.station_id
                    if (preprocessed_content_averages.find(station_to_find => station_to_find.station_id == station) == undefined)
                    {
                        let new_station = {
                            station_id: station ,
                            avg_co: null,
                            avg_no2: null,
                            avg_o3: null,
                            avg_pm10: null,
                            avg_so2: null,
                        }
                        preprocessed_content_averages.push(new_station)
                    }
                    let values = entry.O3
                    let count = values.length
                    let sum = 0
                    for (let j = 0; j < count; j++)
                    {
                        sum = sum + values[j]
                    }
                    preprocessed_content_averages.find(station_to_find => station_to_find.station_id == station).avg_o3 = (sum / count).toFixed(2)
                }
                fs.writeFile("Averages_2016.json", JSON.stringify(preprocessed_content_averages), (err) => {
                    if (err) {
                    console.error(err)
                    }
                    })
                })

                fs.readFile("PM10_2016.json", "utf8", (err, raw_data) => {
                    if (err) {
                        console.error(err)
                    return
                    }
                    let data = JSON.parse(raw_data)
                    for (let i = 0; i < data.length; i++)
                    {
                        let entry = data[i]
                        let station = entry.station_id
                        if (preprocessed_content_averages.find(station_to_find => station_to_find.station_id == station) == undefined)
                        {
                            let new_station = {
                                station_id: station ,
                                avg_co: null,
                                avg_no2: null,
                                avg_o3: null,
                                avg_pm10: null,
                                avg_so2: null,
                            }
                            preprocessed_content_averages.push(new_station)
                        }
                        let values = entry.PM10
                        let count = values.length
                        let sum = 0
                        for (let j = 0; j < count; j++)
                        {
                            sum = sum + values[j]
                        }
                        preprocessed_content_averages.find(station_to_find => station_to_find.station_id == station).avg_pm10 = (sum / count).toFixed(2)
                    }
                    fs.writeFile("Averages_2016.json", JSON.stringify(preprocessed_content_averages), (err) => {
                        if (err) {
                        console.error(err)
                        }
                        })
                    })

                    fs.readFile("SO2_2016.json", "utf8", (err, raw_data) => {
                        if (err) {
                            console.error(err)
                        return
                        }
                        let data = JSON.parse(raw_data)
                        for (let i = 0; i < data.length; i++)
                        {
                            let entry = data[i]
                            let station = entry.station_id
                            if (preprocessed_content_averages.find(station_to_find => station_to_find.station_id == station) == undefined)
                            {
                                let new_station = {
                                    station_id: station ,
                                    avg_co: null,
                                    avg_no2: null,
                                    avg_o3: null,
                                    avg_pm10: null,
                                    avg_so2: null,
                                }
                                preprocessed_content_averages.push(new_station)
                            }
                            let values = entry.SO2
                            let count = values.length
                            let sum = 0
                            for (let j = 0; j < count; j++)
                            {
                                sum = sum + values[j]
                            }
                            preprocessed_content_averages.find(station_to_find => station_to_find.station_id == station).avg_so2 = (sum / count).toFixed(2)
                        }
                        fs.writeFile("Averages_2016.json", JSON.stringify(preprocessed_content_averages), (err) => {
                            if (err) {
                            console.error(err)
                            }
                            })
                        })
                  
                    fs.writeFile("Averages_2016.json", JSON.stringify(preprocessed_content_averages), (err) => {
                        if (err) {
                        console.error(err)
                        }
                        })
   
}

socket.on("paint_histogram", visualisation)
    
socket.on("disconnect", disconnect)

//socket.on("get_station_data", get_station_data)

socket.on("get_data_2016", get_data_2016)

socket.on("get_data_2017", get_data_2017)

socket.on("get_data_2018", get_data_2018)

socket.on("get_data_2019", get_data_2019)

socket.on("get_data_task_2", get_data_task_2)

socket.on("compute_averages_task_2", compute_averages_task_2)

})





