import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const $servicesList = (s: StateSchema) => s.service.serivcesList || [];

export const $servicesTotalCount = (s: StateSchema) => s.service.servicesTotalCount;

export const $service = (s: StateSchema) => s.service.service;

export const $splitters = (s: StateSchema) => s.service.splitters;

const selectTreeNodes = (state: StateSchema) => state.service.nodes;

export const $selectNodesByParentId = (parentId: string | null) =>
    createSelector([selectTreeNodes], (nodes) => {
        if (parentId) {
            console.log(Object.values(nodes));
            return Object.values(nodes).filter((node) => node.id === +parentId)[0].children;
        } else {
            return Object.values(nodes).filter((node) => node.parentId === null);
        }
    });
