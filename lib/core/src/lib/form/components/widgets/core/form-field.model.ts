/*!
 * @license
 * Copyright © 2005-2023 Hyland Software, Inc. and its affiliates. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable @angular-eslint/component-selector */
import { WidgetVisibilityModel } from '../../../models/widget-visibility.model';
import { ContainerColumnModel } from './container-column.model';
import { ErrorMessageModel } from './error-message.model';
import { FormFieldMetadata } from './form-field-metadata';
import { FormFieldOption } from './form-field-option';
import { FormFieldTypes } from './form-field-types';
import { FormWidgetModel } from './form-widget.model';
import { FormFieldRule } from './form-field-rule';
import { ProcessFormModel } from './process-form-model.interface';
import { isNumberValue } from './form-field-utils';
import { VariableConfig } from './form-field-variable-options';
import { DataColumn } from '../../../../datatable/data/data-column.model';
import { DateFnsUtils } from '../../../../common';
import { isValid as isValidDate } from 'date-fns';

// Maps to FormFieldRepresentation
export class FormFieldModel extends FormWidgetModel {
    private _value: string;
    private _readOnly: boolean = false;
    private _isValid: boolean = true;
    private _required: boolean = false;

    readonly defaultDateFormat: string = 'D-M-YYYY';
    readonly defaultDateTimeFormat: string = 'D-M-YYYY hh:mm A';

    // model members
    fieldType: string;
    id: string;
    name: string;
    type: string;
    overrideId: boolean;
    tab: string;
    rowspan: number = 1;
    colspan: number = 1;
    placeholder: string = null;
    tooltip: string = null;
    minLength: number = 0;
    maxLength: number = 0;
    minValue: string;
    maxValue: string;
    maxDateRangeValue: number = 0;
    minDateRangeValue: number = 0;
    dynamicDateRangeSelection: boolean;
    regexPattern: string;
    options: FormFieldOption[] = [];
    restUrl: string;
    roles: string[];
    restResponsePath: string;
    restIdProperty: string;
    restLabelProperty: string;
    hasEmptyValue: boolean;
    className: string;
    optionType: 'rest' | 'manual' | 'variable';
    params: FormFieldMetadata = {};
    hyperlinkUrl: string;
    displayText: string;
    isVisible: boolean = true;
    visibilityCondition: WidgetVisibilityModel = null;
    enableFractions: boolean = false;
    currency: string = null;
    dateDisplayFormat: string = this.defaultDateFormat;
    selectionType: 'single' | 'multiple' = null;
    alignmentType: 'vertical' | 'horizontal' = null;
    rule?: FormFieldRule;
    selectLoggedUser: boolean;
    groupsRestriction: string[];
    leftLabels: boolean = false;
    variableConfig: VariableConfig;
    schemaDefinition: DataColumn[];

    // container model members
    numberOfColumns: number = 1;
    fields: FormFieldModel[] = [];
    columns: ContainerColumnModel[] = [];

    // util members
    emptyOption: FormFieldOption;
    validationSummary: ErrorMessageModel;

    get value(): any {
        return this._value;
    }

    set value(v: any) {
        this._value = v;
        this.updateForm();
    }

    get readOnly(): boolean {
        if (this.form?.readOnly) {
            return true;
        }
        return this._readOnly;
    }

    set readOnly(readOnly: boolean) {
        this._readOnly = readOnly;
        this.updateForm();
    }

    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = value;
        this.updateForm();
    }

    get isValid(): boolean {
        return this._isValid;
    }

    get hasMultipleValues() {
        return this.selectionType === 'multiple';
    }

    markAsInvalid() {
        this._isValid = false;
    }

    validate(): boolean {
        this.validationSummary = new ErrorMessageModel();

        if (!this.readOnly) {
            const validators = this.form.fieldValidators || [];
            for (const validator of validators) {
                if (!validator.validate(this)) {
                    this._isValid = false;
                    return this._isValid;
                }
            }
        }
        this._isValid = true;
        return this._isValid;
    }

    constructor(form: any, json?: any) {
        super(form, json);
        if (json) {
            this.fieldType = json.fieldType;
            this.id = json.id;
            this.name = json.name;
            this.type = json.type;
            this.roles = json.roles;
            this._required = json.required;
            this._readOnly = json.readOnly || json.type === 'readonly';
            this.overrideId = json.overrideId;
            this.tab = json.tab;
            this.restUrl = json.restUrl;
            this.restResponsePath = json.restResponsePath;
            this.restIdProperty = json.restIdProperty;
            this.restLabelProperty = json.restLabelProperty;
            this.colspan = json.colspan;
            this.rowspan = json.rowspan;
            this.minLength = json.minLength || 0;
            this.maxLength = json.maxLength || 0;
            this.minValue = json.minValue;
            this.maxValue = json.maxValue;
            this.minDateRangeValue = json.minDateRangeValue;
            this.maxDateRangeValue = json.maxDateRangeValue;
            this.dynamicDateRangeSelection = json.dynamicDateRangeSelection;
            this.regexPattern = json.regexPattern;
            this.options = json.options || [];
            this.hasEmptyValue = json.hasEmptyValue;
            this.className = json.className;
            this.optionType = json.optionType;
            this.params = json.params || {};
            this.hyperlinkUrl = json.hyperlinkUrl;
            this.displayText = json.displayText;
            this.visibilityCondition = json.visibilityCondition ? new WidgetVisibilityModel(json.visibilityCondition) : undefined;
            this.enableFractions = json.enableFractions;
            this.currency = json.currency;
            this.dateDisplayFormat = json.dateDisplayFormat || this.getDefaultDateFormat(json);
            this._value = this.parseValue(json);
            this.validationSummary = new ErrorMessageModel();
            this.tooltip = json.tooltip;
            this.selectionType = json.selectionType;
            this.alignmentType = json.alignmentType;
            this.rule = json.rule;
            this.selectLoggedUser = json.selectLoggedUser;
            this.groupsRestriction = json.groupsRestriction?.groups;
            this.variableConfig = json.variableConfig;
            this.schemaDefinition = json.schemaDefinition;

            if (json.placeholder && json.placeholder !== '' && json.placeholder !== 'null') {
                this.placeholder = json.placeholder;
            }

            if (FormFieldTypes.isReadOnlyType(this.type)) {
                if (this.params?.field) {
                    this.setValueForReadonlyType(form);
                }
            }

            if (FormFieldTypes.isContainerType(this.type)) {
                this.containerFactory(json, form);
            }
        }

        if (form?.json) {
            this.leftLabels = form.json.leftLabels || false;
        }

        const emptyOption = Array.isArray(this.options) ? this.options.find(({ id }) => id === 'empty') : undefined;
        if (this.hasEmptyValue === undefined) {
            this.hasEmptyValue = json?.hasEmptyValue ?? !!emptyOption;
        }

        if (this.options && this.options.length > 0 && this.hasEmptyValue) {
            this.emptyOption = emptyOption;
        }

        this.updateForm();
    }

    private setValueForReadonlyType(form: any) {
        const value = this.getProcessVariableValue(this.params.field, form);
        if (value) {
            this.value = value;
        }
    }

    private getDefaultDateFormat(jsonField: any): string {
        let originalType = jsonField.type;
        if (FormFieldTypes.isReadOnlyType(jsonField.type) && jsonField.params && jsonField.params.field) {
            originalType = jsonField.params.field.type;
        }
        return originalType === FormFieldTypes.DATETIME ? this.defaultDateTimeFormat : this.defaultDateFormat;
    }

    private isTypeaheadFieldType(type: string): boolean {
        return type === 'typeahead';
    }

    private getFieldNameWithLabel(name: string): string {
        return name + '_LABEL';
    }

    private getProcessVariableValue(field: any, form: ProcessFormModel): any {
        let fieldName = field.name;
        if (this.isTypeaheadFieldType(field.type)) {
            fieldName = this.getFieldNameWithLabel(field.id);
        }
        return form.getProcessVariableValue(fieldName);
    }

    private containerFactory(json: any, form: any): void {
        this.numberOfColumns = json.numberOfColumns || 1;

        this.fields = json.fields;

        this.rowspan = 1;
        this.colspan = 1;

        if (json.fields) {
            for (const currentField in json.fields) {
                if (Object.prototype.hasOwnProperty.call(json.fields, currentField)) {
                    const col = new ContainerColumnModel();

                    col.fields = (json.fields[currentField] || []).map((field) => new FormFieldModel(form, field));
                    col.rowspan = json.fields[currentField].length;

                    col.fields.forEach((colFields: any) => {
                        this.colspan = colFields.colspan > this.colspan ? colFields.colspan : this.colspan;
                    });

                    this.rowspan = this.rowspan < col.rowspan ? col.rowspan : this.rowspan;
                    this.columns.push(col);
                }
            }
        }
    }

    parseValue(json: any): any {
        let value = Object.prototype.hasOwnProperty.call(json, 'value') && json.value !== undefined ? json.value : null;

        /*
         This is needed due to Activiti issue related to reading dropdown values as value string
         but saving back as object: { id: <id>, name: <name> }
         */
        if (json.type === FormFieldTypes.DROPDOWN) {
            if (json.options) {
                if (json.hasEmptyValue) {
                    const emptyOption = json.options[0];
                    if (value === '' || value === emptyOption.id || value === emptyOption.name) {
                        value = emptyOption.id;
                    }
                } else {
                    if (value?.id && value?.name) {
                        value = value.id;
                    }
                }
            }

            if (this.hasMultipleValues) {
                value = Array.isArray(json.value) ? json.value : [];
            }
        }

        /*
         This is needed due to Activiti issue related to reading radio button values as value string
         but saving back as object: { id: <id>, name: <name> }
         */
        if (json.type === FormFieldTypes.RADIO_BUTTONS) {
            // Activiti has a bug with default radio button value where initial selection passed as `name` value
            // so try resolving current one with a fallback to first entry via name or id
            // TODO: needs to be reported and fixed at Activiti side
            const entry: FormFieldOption[] = this.options.filter(
                (opt) => opt.id === value || opt.name === value || (value && (opt.id === value.id || opt.name === value.name))
            );
            if (entry.length > 0) {
                value = entry[0].id;
            }
        }

        /*
         This is needed due to Activiti displaying/editing dates in d-M-YYYY format
         but storing on server in ISO8601 format (i.e. 2013-02-04T22:44:30.652Z)
         */
        if (this.isDateField(json) || this.isDateTimeField(json)) {
            if (value) {
                let dateValue: Date;

                if (isNumberValue(value)) {
                    dateValue = new Date(value);
                } else {
                    dateValue = this.isDateTimeField(json)
                        ? DateFnsUtils.parseDate(value, 'YYYY-MM-DD hh:mm A')
                        : DateFnsUtils.parseDate(value.split('T')[0], 'YYYY-M-D');
                }

                if (isValidDate(dateValue)) {
                    value = DateFnsUtils.formatDate(dateValue, this.dateDisplayFormat);
                }
            }
        }

        if (this.isCheckboxField(json)) {
            value = json.value === 'true' || json.value === true;
        }

        return value;
    }

    updateForm() {
        if (!this.form) {
            return;
        }

        switch (this.type) {
            case FormFieldTypes.DROPDOWN: {
                if (!this.value) {
                    this.form.values[this.id] = null;
                    break;
                }

                /*
                 This is needed due to Activiti reading dropdown values as string
                 but saving back as object: { id: <id>, name: <name> }
                 */
                if (Array.isArray(this.value)) {
                    this.form.values[this.id] = this.value;
                    break;
                }

                if (typeof this.value === 'string') {
                    if (this.value === 'empty' || this.value === '') {
                        this.form.values[this.id] = null;
                        break;
                    }

                    const entry: FormFieldOption[] = this.options.filter((opt) => opt.id === this.value);
                    if (entry.length > 0) {
                        this.form.values[this.id] = entry[0];
                    }
                }
                break;
            }
            case FormFieldTypes.RADIO_BUTTONS: {
                const radioButton: FormFieldOption[] = this.options.filter((opt) => opt.id === this.value);
                if (radioButton.length > 0) {
                    this.form.values[this.id] = radioButton[0];
                }
                break;
            }
            case FormFieldTypes.UPLOAD: {
                this.form.hasUpload = true;
                if (this.value && this.value.length > 0) {
                    this.form.values[this.id] = Array.isArray(this.value) ? this.value.map((elem) => elem.id).join(',') : [this.value];
                } else {
                    this.form.values[this.id] = null;
                }
                break;
            }
            case FormFieldTypes.TYPEAHEAD: {
                const typeAheadEntry: FormFieldOption[] = this.options.filter((opt) => opt.id === this.value || opt.name === this.value);
                if (typeAheadEntry.length > 0) {
                    this.form.values[this.id] = typeAheadEntry[0];
                } else if (this.options.length > 0) {
                    this.form.values[this.id] = null;
                }
                break;
            }
            case FormFieldTypes.DATE: {
                if (typeof this.value === 'string' && this.value === 'today') {
                    this.value = DateFnsUtils.formatDate(new Date(), this.dateDisplayFormat);
                }

                const dateValue = DateFnsUtils.parseDate(this.value, this.dateDisplayFormat);

                if (isValidDate(dateValue)) {
                    const datePart = DateFnsUtils.formatDate(dateValue, 'yyyy-MM-dd');
                    this.form.values[this.id] = `${datePart}T00:00:00.000Z`;
                } else {
                    this.form.values[this.id] = null;
                    this._value = this.value;
                }
                break;
            }
            case FormFieldTypes.DATETIME: {
                if (typeof this.value === 'string' && this.value === 'now') {
                    this.value = DateFnsUtils.formatDate(new Date(), this.dateDisplayFormat);
                }

                const dateTimeValue = new Date(this.value);

                if (isValidDate(dateTimeValue)) {
                    this.form.values[this.id] = dateTimeValue.toISOString();
                } else {
                    this.form.values[this.id] = null;
                    this._value = this.value;
                }
                break;
            }
            case FormFieldTypes.NUMBER: {
                this.form.values[this.id] = this.enableFractions ? parseFloat(this.value) : parseInt(this.value, 10);
                break;
            }
            case FormFieldTypes.AMOUNT: {
                this.form.values[this.id] = this.enableFractions ? parseFloat(this.value) : parseInt(this.value, 10);
                break;
            }
            case FormFieldTypes.BOOLEAN: {
                this.form.values[this.id] = this.value !== null && this.value !== undefined ? this.value : false;
                break;
            }
            case FormFieldTypes.PEOPLE: {
                this.form.values[this.id] = this.value ? this.value : null;
                break;
            }
            case FormFieldTypes.FUNCTIONAL_GROUP: {
                this.form.values[this.id] = this.value ? this.value : null;
                break;
            }
            default:
                if (!FormFieldTypes.isReadOnlyType(this.type) && !this.isInvalidFieldType(this.type)) {
                    this.form.values[this.id] = this.value;
                }
        }

        this.form.onFormFieldChanged(this);
    }

    /**
     * Check if the field type is invalid, requires a type to be a `container`
     *
     * @param type field type
     * @returns `true` if type is a `container`, otherwise `false`
     */
    isInvalidFieldType(type: string): boolean {
        return type === 'container';
    }

    getOptionName(): string {
        const option: FormFieldOption = this.options.find((opt) => opt.id === this.value);
        return option ? option.name : null;
    }

    hasOptions() {
        return this.options?.length > 0;
    }

    private isDateField(json: any) {
        return json.params?.field?.type === FormFieldTypes.DATE || json.type === FormFieldTypes.DATE;
    }

    private isDateTimeField(json: any): boolean {
        return json.params?.field?.type === FormFieldTypes.DATETIME || json.type === FormFieldTypes.DATETIME;
    }

    private isCheckboxField(json: any): boolean {
        return json.params?.field?.type === FormFieldTypes.BOOLEAN || json.type === FormFieldTypes.BOOLEAN;
    }
}
