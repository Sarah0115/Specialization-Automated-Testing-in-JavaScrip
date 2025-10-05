let expect;
let Joi;
let request;

const BASIC = 'Basic ' + Buffer.from('admin:password123').toString('base64');

async function timed(cb) {
    const start = Date.now();
    const res = await cb();
    const ms = Date.now() - start;
    expect(ms).to.be.lessThanOrEqual(3000);
    return res;
}

describe('Booking API - GET', () => {
    before(async () => {
        const chai = await import('chai');
        expect = chai.expect;

        const joiModule = await import('joi');
        Joi = joiModule.default;

        request = (await import('supertest')).default(
            'https://restful-booker.herokuapp.com'
        );
    });

    it('GET: should return a list of booking IDs', async () => {
        const res = await timed(() =>
            request
                .get('/booking')
                .set('Accept', 'application/json')
                .set('Authorization', BASIC)
        );

        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.include('application/json');
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);

        const schema = Joi.array()
            .items(Joi.object({ bookingid: Joi.number().required() }))
            .required();
        Joi.assert(res.body, schema);
    });
    -it('GET: should return a booking by ID', async () => {
        const list = await timed(() =>
            request
                .get('/booking')
                .set('Accept', 'application/json')
                .set('Authorization', BASIC)
        );
        expect(list.status).to.equal(200);
        const id = list.body[0].bookingid;

        const res = await timed(() =>
            request
                .get(`/booking/${id}`)
                .set('Accept', 'application/json')
                .set('Authorization', BASIC)
        );

        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.include('application/json');

        const schema = Joi.object({
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            totalprice: Joi.number().required(),
            depositpaid: Joi.boolean().required(),
            bookingdates: Joi.object({
                checkin: Joi.string().required(),
                checkout: Joi.string().required(),
            }).required(),
            additionalneeds: Joi.string().optional(),
        }).required();

        Joi.assert(res.body, schema);
    });
});
