/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabAssets extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const assets = [
            {
                color: 'grey',
                make: 'Apple',
                model: 'Macbook Pro',
                owner: 'DTHORNTO',
            },
        ];

        for (let i = 0; i < assets.length; i++) {
            assets[i].docType = 'asset';
            await ctx.stub.putState('ASSET' + i, Buffer.from(JSON.stringify(assets[i])));
            console.info('Added <--> ', assets[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryAsset(ctx, assetNumber) {
        const assetAsBytes = await ctx.stub.getState(assetNumber); // get the asset from chaincode state
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`${assetNumber} does not exist`);
        }
        console.log(assetAsBytes.toString());
        return assetAsBytes.toString();
    }

    async createAsset(ctx, assetNumber, make, model, color, owner) {
        console.info('============= START : Create asset ===========');

        const asset = {
            color,
            docType: 'asset',
            make,
            model,
            owner,
        };

        await ctx.stub.putState(assetNumber, Buffer.from(JSON.stringify(asset)));
        console.info('============= END : Create asset ===========');
    }

    async queryAllAssets(ctx) {
        const startKey = 'ASSET0';
        const endKey = 'ASSET999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        ctx.stub.getState

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }


    async changeAssetOwner(ctx, assetNumber, newOwner, currentOwner) {
        console.info('============= START : changeAssetOwner ===========');

        const assetAsBytes = await ctx.stub.getState(assetNumber); // get the asset from chaincode state
        //Validate the asset exists

        const assetJson = JSON.parse(assetAsBytes.toString());

        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`${assetNumber} does not exist`);
        }
        // Validate current owner
        if (assetJson.owner !== currentOwner) {
            throw new Error('Asset ' + assetNumber + ' is not owned by ' + currentOwner);
        }


        assetJson.owner = newOwner;

        await ctx.stub.putState(assetNumber, Buffer.from(JSON.stringify(assetJson)));
        console.info('============= END : changeAssetOwner ===========');
    }
}

module.exports = FabAssets;
