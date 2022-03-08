import Image from './Image'
import Video from './Video'

function RendedStatus({ status, refetch, setRefetch, setSelectedStatus, isPartnerStatus  }) {
    switch(status.type){
        case 'image':
              return <Image status={status} refetch={refetch} setRefetch={setRefetch} setSelectedStatus={setSelectedStatus} isPartnerStatus={isPartnerStatus} />
            break
        case 'video':
              return <Video status={status} refetch={refetch} setRefetch={setRefetch} setSelectedStatus={setSelectedStatus} isPartnerStatus={isPartnerStatus} />
            break
        default:
              return null
    }
}

export default RendedStatus