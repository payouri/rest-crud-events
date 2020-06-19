import Joi from '@hapi/joi'

export const eventSchema = Joi.object({
    start: Joi.number().integer().positive().required().example(Date.now()),
    end: Joi.number().integer().positive().required(),
    allDay: Joi.bool().failover(false),
    title: Joi.string().min(3).max(100).required(),
    location: Joi.object({
        latitude: Joi.number().min(-90).max(90).precision(5).required(),
        longitude: Joi.number().min(-180).max(180).precision(5).required(),
    }),
    creator: Joi.string(),
    attendees: Joi.array().items(Joi.string())
}).exist()
    .with('location.latitude', 'location.longitude')
export default eventSchema