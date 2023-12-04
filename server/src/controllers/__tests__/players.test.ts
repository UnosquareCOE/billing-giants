import { when } from "jest-when";
import { playersController } from "../players";
import { mockRequest, mockResponse } from "../../test-utils/mockExpress";
import { playersService } from "../../services/players";

jest.mock("../../services/players");

describe("players controller", () => {
    describe("getAll", () => {
        it("should return 200 when players are available", async () => {
            // arrange
            const req = mockRequest();
            const res = mockResponse();

            const players = [
                { id: 1, name: "Draculla" },
            ];

            when(playersService.getAll)
                .calledWith()
                .mockReturnValueOnce(Promise.resolve(players));

            // act
            await playersController.getAll(req, res);

            // assert
            expect(playersService.getAll).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(players);
        });
    });

    describe("getSingle", () => {
        it("should return a player when the id exists", async () => {
            // arrange
            const playerId = 1;
            const req = mockRequest({ params: { playerId } });
            const res = mockResponse();

            const player = {
                id: playerId,
                name: "Storm"
            };

            when(playersService.getSingle)
                .calledWith(playerId)
                .mockReturnValueOnce(Promise.resolve(player));

            // act
            await playersController.getSingle(req, res);

            // assert
            expect(playersService.getSingle).toHaveBeenCalledWith(playerId);
            expect(playersService.getSingle).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(player);
        });


        it("should return not found when id does not exists", async () => {
            // arrange
            const playerId = 1;
            const req = mockRequest({ params: { playerId } });
            const res = mockResponse();
            // act
            await playersController.getSingle(req, res);

            // assert
            expect(res.sendStatus).toHaveBeenCalledWith(404);
        });


    });

    describe("create", () => {
        it("should create a player when valid details supplied", async () => {
            // arrange

            const name = "random";
            const player = {
                id: 1,
                name
            };

            const req = mockRequest({ body: { name : "random" } });
            const res = mockResponse();

            when(playersService.create)
                .calledWith(name)
                .mockReturnValueOnce(Promise.resolve(player));

            // act
            await playersController.create(req, res);

            // assert
            expect(playersService.create).toHaveBeenCalledWith(name);
            expect(playersService.create).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(player);
        });
    });

    describe("update", () => {
        it("should update a player when valid id provided", async () => {
            // arrange

            const id = 1;
            const name = "random";
            const player = {
                id,
                name
            };

            const req = mockRequest({ params: { playerId: id}, body: { name : "random" } });
            const res = mockResponse();

            when(playersService.update)
                .calledWith(id, name)
                .mockReturnValueOnce(Promise.resolve(player));

            // act
            await playersController.update(req, res);

            // assert
            expect(playersService.update).toHaveBeenCalledWith(id,name);
            expect(playersService.update).toHaveBeenCalledTimes(1);
            expect(res.sendStatus).toHaveBeenCalledTimes(1);
            expect(res.sendStatus).toHaveBeenCalledWith(204);
        });
    });


    describe("delete", () => {
        it("should delete a player when valid id provided", async () => {
            // arrange

            const id = 1;
            const name = "random";
            const player = {
                id,
                name
            };

            const req = mockRequest({ params: { playerId: id} });
            const res = mockResponse();

            when(playersService.getSingle)
                .calledWith(id)
                .mockReturnValueOnce(Promise.resolve(player));

            // act
            await playersController.deleteSingle(req, res);

            // assert
            expect(playersService.getSingle).toHaveBeenCalledWith(id);
            expect(playersService.getSingle).toHaveBeenCalledTimes(1);
            expect(playersService.deleteSingle).toHaveBeenCalledTimes(1);
            expect(res.sendStatus).toHaveBeenCalledTimes(1);
            expect(res.sendStatus).toHaveBeenCalledWith(204);
        });

        it("should return not found when invalid id provided", async () => {
            // arrange

            const id = 1;
        
            const req = mockRequest({ params: { playerId: id} });
            const res = mockResponse();

            // act
            await playersController.deleteSingle(req, res);

            // assert
            expect(playersService.getSingle).toHaveBeenCalledWith(id);
            expect(playersService.getSingle).toHaveBeenCalledTimes(1);
            expect(playersService.deleteSingle).toHaveBeenCalledTimes(0);
            expect(res.sendStatus).toHaveBeenCalledTimes(1);
            expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
    });

});
