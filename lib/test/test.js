'use strict';

module.exports = app => {
    const { STRING, INTEGER, DECIMAL } = app.Sequelize;
    const RewardPool = app.model.define('reward_pool', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: '自增id'
        },
        uid: {
            type: INTEGER,
            allowNull: false,
            comment: '用户id'
        },
        chain: {
            type: STRING(50),
            // allowNull: false,
            defaultValue: 'ETH',
            comment: '主链'
        },
        symbol: {
            type: STRING(50),
            allowNull: false,
            comment: '积分种类'
        },
        amount: {
            type: STRING,
            allowNull: false,
            comment: '奖励数量'
        },
        rate: {
            type: DECIMAL(10, 3),
            allowNull: false,
            defaultValue: 1.0,
            comment: '奖励数量比例'
        },
        type: {
            type: STRING(50),
            allowNull: false,
            comment: '奖励分类 changeless: 固定奖励 dynamic: 动态奖励 direct直推奖励 indirect伞下分佣'
        },
        status: {
            type: STRING(50),
            allowNull: false,
            defaultValue: 'ntyt',
            comment: '领取状态 ntyt:未领取 received:已领取 expired:已过期'
        }
    }, {
        comment: '奖励池表'
    });
    return RewardPool;
};
