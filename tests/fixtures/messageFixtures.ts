import { EventNotifierSNSMessage, ObjectTypeNotificationEnum, EventTypeNotificationEnum, EventNotifierWorkData } from 'street-manager-data'
import { SNSMessage, SNSMessageAttribute, SNSMessageAttributes } from 'aws-lambda'

export function generateEventNotifierSNSMessage(): EventNotifierSNSMessage {
  return {
    event_reference: 1005,
    event_type: EventTypeNotificationEnum.WORK_START,
    object_data: generateEventNotifierWorkData(),
    event_time: new Date(),
    object_reference: 'some-ref-01',
    object_type: ObjectTypeNotificationEnum.PERMIT,
    version: 1
  }
}

export function generateEventNotifierWorkData(): EventNotifierWorkData {
  return {
    work_reference_number: 'some-ref',
    permit_reference_number: 'some ref-01',
    promoter_swa_code: 'a',
    promoter_organisation: 'some promoter',
    highway_authority: 'some ha',
    works_location_coordinates: 'Point: 085647.67,653421.03',
    street_name: 'some street',
    area_name: 'some area',
    work_category: 'Standard',
    traffic_management_type: 'No carriageway incursion',
    proposed_start_date: '15-07-2019',
    proposed_start_time: '11:00',
    proposed_end_date: '17-07-2019',
    proposed_end_time: '12:00',
    actual_start_date_time: '15-07-2019 01:00',
    actual_end_date_time: '17-07-2019 01:00',
    work_status: 'Works planned',
    usrn: '8400845',
    highway_authority_swa_code: 'a',
    work_category_ref: 'standard',
    traffic_management_type_ref: 'no_carriageway_incursion',
    work_status_ref: 'planned',
    activity_type: 'Core Sampling',
    is_ttro_required: 'No',
    works_location_type: 'some works location type',
    permit_conditions: 'NCT01a',
    road_category: '4',
    is_traffic_sensitive: 'No',
    is_deemed: 'Yes',
    permit_status: 'granted',
    town: 'Some Town'
  }
}

export function generateSNSMessage(message = JSON.stringify(generateEventNotifierSNSMessage())): SNSMessage {
  return {
    Message: message,
    Timestamp: new Date().getTime().toString(),
    SignatureVersion: 'v1',
    Signature: 'signature',
    SigningCertUrl: 'url',
    MessageId: '001',
    MessageAttributes: generateSNSMessageAttributes(),
    Type: 'type',
    UnsubscribeUrl: 'url',
    TopicArn: 'topicarn',
    Subject: 'subject'
  }
}

export function generateSNSMessageAttributes(): SNSMessageAttributes {
  return {
    'attribute': generateSNSMessageAttribute()
  }
}

export function generateSNSMessageAttribute(): SNSMessageAttribute {
  return {
    Type: 'type',
    Value: 'value'
  }
}
