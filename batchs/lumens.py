from pymongo import MongoClient
client = MongoClient('mongodb://ec2-34-202-239-178.compute-1.amazonaws.com:8087')
db = client.lumenconcept_telemetry

pipeline = [
	{
		"$group": {
			"_id": { "$substr": ["$datetime", 0, 9]},
			"count": {"$sum": 1}
		}		
	}	
]
collection = db.telemetry.aggregate(pipeline)

for row in collection:	
	filtered = db.telemetry.find({
		"datetime": {"$regex": row['_id']}
	})
	contador = 0
	for register in filtered:		
		for medida in register['measurements']:
			if medida['id'] == 'LI':	
				contador = contador + int(medida['value'])			
					
	db.telemetry_li.insert_one({
		"date": row['_id'],
		"total": contador,
		"avg": contador/int(row['count']),
	})