<template>
    <div>
        <h2 id="page-heading">
            <span id="label-heading">Labels</span>
            <router-link :to="{name: 'LabelCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-label">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Label
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="table-responsive" v-if="labels">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Label</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="label in labels"
                    :key="label.id">
                    <td>
                        <router-link :to="{name: 'LabelView', params: {labelId: label.id}}">{{label.id}}</router-link>
                    </td>
                    <td>{{label.label}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'LabelView', params: {labelId: label.id}}" tag="button" class="btn btn-info btn-sm">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'LabelEdit', params: {labelId: label.id}}"  tag="button" class="btn btn-primary btn-sm">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(label)"
                                   class="btn btn-danger btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="refreshApp.label.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-label-heading" >Are you sure you want to delete this Label?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-label" v-on:click="removeLabel()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./label.component.ts">
</script>
